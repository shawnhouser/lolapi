var http = require('http');
var https = require('https');
var config = require('./config');
var RateLimiter = require('./rateLimiter');
var redis = require('redis');

var _apiKey = null;
var _limiterPer10s;
var _limiterPer10min;
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

  util.setDefaultRateLimit = function () {
    var limitPer10s = config.defaultLimitPer10s;
    var limitPer10min = config.defaultLimitPer10min;

    _limiterPer10s = new RateLimiter(limitPer10s, 10 * 1000);
    _limiterPer10min = new RateLimiter(limitPer10min, 10 * 60 * 1000);
  };

  util.setRateLimit = function (limitPer10s, limitPer10min, allowBursts) {
    if (!limitPer10s || !Number.isInteger(limitPer10s)) {
      throw new Error('Invalid limit per 10 seconds: ' + limitPer10s);
    }
    if (!limitPer10min || !Number.isInteger(limitPer10min)) {
      throw new Error('Invalid limit per 10 minutes: ' + limitPer10min);
    }

    allowBursts = allowBursts || false;

    _limiterPer10s = new RateLimiter(limitPer10s, 10 * 1000, allowBursts);
    _limiterPer10min = new RateLimiter(limitPer10min, 10 * 60 * 1000, allowBursts);
  };
  /* Given $array, finds the $nthOccurrence of an element that has $types */
  util.find = function(types, nthObject, array){
    if(typeof nthObject === 'object'){
      array = arguments[1];
      nthObject = 1;
    }
    for(var i = 0; i < array.length; i++){
      if(types.includes(typeof array[i]) && !(--nthObject)){
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
        }
        schedule();
      });
    } else {
      schedule();
    }
	function schedule() {
		if (options.static) {
        	util._get(options, callback);
      	} else {
			util.schedule(function () {
          		util._get(options, function () {
            		callback.apply(this, arguments);
          		});
        	});
		}
	}
  };
  
  /* Tries to schedule on both the 10s & 10m Rate limiter, and whene one responds, executes fn() */
  util.schedule = function (fn) {
	/* fn is a function to be ran when it is at the front of the call queue */
	var hasBeenRun = false;	
	_limiterPer10min.schedule(function () {
		if(!hasBeenRun){
			hasBeenRun = true;
			fn();
		}
	});
	_limiterPer10s.schedule(function () {
		if(!hasBeenRun){
			hasBeenRun = true;
			fn();
		}
	});

  }
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