'use strict';

var http = require('http');
var https = require('https');
var config = require('./config');
var RateLimiter = require('./rateLimiter');
var redis = require('redis');

var _apiKey = null;
var _platform = config.defaultPlatform;
var _cacheTTL = config.defaultTTL;
var _debug = false;
var _useRedis = false;

RateLimiter.createRateLimiter(config.defaultLimitString);

module.exports = {
  setApiKey: (apiKey) => _apiKey = apiKey,
  setPlatform: (platform) => _platform = platform,
  setCacheTTL: (timeout) => _cacheTTL = timeout,
  setDebug: (debug) => _debug = debug,
  enableRedis: function (port, host, options) {
    if (!_useRedis && redis.createClient) {
      if (port && host) {
        options = options || {};
        redis = redis.createClient.apply(this, arguments);
      } else {
        redis = redis.createClient();
      }
      _useRedis = true;
    }
  },
  setRateLimit: RateLimiter.createRateLimiter,

  /* Given $array, finds the $nthOccurrence of an element that has $types */
  find: function(types, nthOccurrence, array){
    if(typeof nthOccurrence === 'object'){
      array = arguments[1];
      nthOccurrence = 1;
    }
    for(var i = 0; i < array.length; i++){
      if(types.includes(typeof array[i]) && !(--nthOccurrence)){
        return array[i];
      }
    }
    return null;
  },

  exec: function (options, callback) {
    if(!callback || typeof callback !== 'function'){
      callback('Invalid callback: ' + callback, null);
    }
    if(!options || typeof options !== 'object'){
      callback('Invalid options: ' + options, null);
    }
    options.uri = craftUri(options);
    request(options, callback);
  }

};

function craftUri(options) {
/* https://{platform}.{domain}/{game}/{service}/{version}/{resource}{queryArgs} */
  var service = options.service;
  var resource = options.resource;
  var platformId = options.platform || _platform;
  var domain = options.domain || config.defaultDomain;
  var version = options.version || config.defaultVersion;
  var game = options.game || config.defaultGame;
  var host = 'https://' + platformId + '.' + domain + '/';
  var path = game + '/' + service + '/' + version + '/' + resource
    
  var apiArg = '?api_key=' + _apiKey;
  var queryArgs = '';
  for (var arg in options.query) {
    queryArgs += '&' + arg + '=' + options.query[arg];
  }
  
  return host + path + apiArg + queryArgs;
};

function request(options, callback) {
  if (_useRedis) {
    redis.get(options.uri, function (error, results) {
      if (!error && results) {
        try {
          var obj = JSON.parse(results);
          callback(null, obj);
          return;
        } catch (err) {
          redis.del(options.uri);
        }
      } else {
      	schedule(options, callback);
	  }
    });
  } else {
    schedule(options, callback);
  }
};

function schedule(options, callback) {
  if (options.static) {
    _get(options, callback);
  } else {
    RateLimiter.schedule( function() {
      _get(options, callback)
    });
  }
};
  
/* When this function is called, it means it is okay to download */
function _get(options, callback) {
  var data = '';
  var protocol = options.useHttp ? http : https;

  protocol.get(options.uri, function (response) {
    var contentType = response.headers['content-type'];

    if (response.statusCode === 429 && 'retry-after' in response.headers) {
      var retryAfter = response.headers['retry-after'];

      if (_debug) {
        console.log('Rate limit reached. Retrying in ' + retryAfter + ' seconds...');
      }

      setTimeout(function () {
        _get(options, callback);
      }, retryAfter * 1000);

      return;
    }

    response.on('data', (chunk) => data += chunk);

    response.on('error', function (error) {
      callback(error, null);
    });

    response.on('end', function () {
      if (contentType.indexOf('application/json') === -1) {
        callback(response.statusCode + ' API failed to return JSON content', null);
        return;
      }

      if (!data) {
        callback(null, null);
        return;
      }

      try {
        data = JSON.parse(data);
      } catch (error) {
        callback('Unable to parse data received from the server', null);
        return;
      }

      if (data.status && data.status.status_code !== 200) {
        callback(data.status.status_code + ' ' + data.status.message, null);
      } else {
        if (_useRedis || options.cacheRequest) {
          redis.set(options.uri, JSON.stringify(data));
          redis.expire(options.uri, _cacheTTL);
        }

        callback(null, data);
      }
    });
  });
};

