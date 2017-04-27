var http = require('http');
var https = require('https');
var config = require('./config');
var RateLimiter = require('./rateLimiter');
var redis = require('redis');

var _apiKey = null;
var _rateLimiter;
var _useRedis = false;
var _cacheTTL = config.defaultTTL;
var _debug = false;

module.exports = function(platform){
  'use strict';

  var util = {};

  util.enableRedis = function (port, host, options) {
    if (!_useRedis && redis.createClient) {
      if (port && host) {
        options = options || {};
        redis = redis.createClient.apply(this, arguments);
      } else {
        redis = redis.createClient();
      }
      _useRedis = true;
    }
  };

  util.setCacheTTL = function (timeout) {
    _cacheTTL = timeout;
  };

  util.setApiKey = function (apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('Invalid API key: ' + apiKey);
    }

    _apiKey = apiKey;
  };

  util.setRateLimit = function (limitString) {
    /*  Limit string Example - "10:10;500:600" */
    limitString = typeof limitString === 'string' ? limitString : config.defaultLimitString;

    var rates = limitString.split(';').map(function(currentRateString) {
        var currentRate = currentRateString.split(':');
        return currentRate[1] / currentRate[0];
    });
    _rateLimiter = new RateLimiter(Math.max(...rates));
  };
  util.setRateLimit(config.defaultLimitString); // Set default rate limit

  /* Given $array, finds the $nthOccurrence of an element that has $types */
  util.find = function(types, nthOccurrence, array){
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
  };

  util.exec = function (options, callback) {
    if(!callback || typeof callback !== 'function'){
      callback('Invalid callback: ' + callback, null);
    }
    if(!options || typeof options !== 'object'){
      callback('Invalid options: ' + options, null);
    }
    options.uri = util.craftUri(options);
    util.request(options, callback);
  };

  util.craftUri = function (options) {
  /* https://{platform}.{domain}/{game}/{service}/{version}/{resource}{queryArgs} */
    var service = options.service;
    var resource = options.resource;
    var platformId = options.platform || platform || config.defaultPlatform;
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

  util.request = function (options, callback) {

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
        	schedule();
		}
      });
    } else {
      schedule();
    }
    function schedule() {
      if (options.static) {
        util._get(options, callback);
      } else {
        _rateLimiter.schedule(
          util._get(options, callback)
        );
      }
    }
  };

  /* When this function is called, it means it is okay to download */
  util._get = function (options, callback) {
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
          util._get(options, callback);
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

  return util;

};