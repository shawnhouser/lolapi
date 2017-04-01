module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function(championId, options, callback){
      if (arguments.length === 1 && typeof championId === 'function') {
        // (callback, null, null)
        callback = arguments[0];
        championId = null;
        options = null;
      } else if(arguments.length === 2 && typeof championId === 'number'){
        // (championId, callback, null)
        callback = arguments[1];
        options = null;
      } else if(arguments.length === 2 && typeof championId === 'object'){
        // (options, callback, null)
        callback = arguments[1];
        championId = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri[championId ? 'CHAMPION_ID' : 'CHAMPION_LIST'];
      options.championId = championId;
      if(!championId){
        options.query = {
          freeToPlay: options.freeToPlay || false
        };
      }

      util.exec(options, callback);
    }
  };

};