module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    getChampionMastery: function (summonerId, championId, options, callback) {
      if (arguments.length === 2 && typeof championId === 'function') {
        /* There is summonerId, and Callback */
        callback = arguments[1];
        options = null;
        championId = null;
      } else if (arguments.length === 3 && typeof championId === 'number') {
        /* There is summonerId, ChampionID, and Callback */
        callback = arguments[2];
        options = null;
      } else if (arguments.length === 3 && typeof championId === 'object') {
        /* There is summonerId, Options, and Callback */
        options = championId;
        callback = arguments[2];
        championId = null;
      }
        /* There is summonerId, ChampionId, Options, and Callback */
		
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      (championId)? options.uri = config.uri.CHAMPIONMASTERY_CHAMPION : options.uri = config.uri.CHAMPIONMASTERY_ALL;
	  options.championId = championId;
      options.summonerId = summonerId;
      options.platformId = config.platforms[options.region].id;
      options.endpoint = 'api.pvp.net';

      util.exec(options, callback);
    },
	getScore: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
	  }
		
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CHAMPIONMASTERY_SCORE;
      options.summonerId = summonerId;
      options.platformId = config.platforms[options.region].id;
      options.endpoint = 'api.pvp.net';

      util.exec(options, callback);
    },
	getTop: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
	  }
		
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CHAMPIONMASTERY_TOP;
      options.summonerId = summonerId;
      options.platformId = config.platforms[options.region].id;
      options.endpoint = 'api.pvp.net';
	  options.query = {
        count: options.count || 3 // 3 is Riot's Default
      };

      util.exec(options, callback);
    }
  };

};