module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);
  var service = 'champion-mastery';

  return {
    getChampionMastery: function (summonerId, championId, options, callback) {
      if (arguments.length === 2 && typeof championId === 'function') {
        // (summonerId, callback, null, null)
        callback = arguments[1];
        options = null;
        championId = null;
      } else if (arguments.length === 3 && typeof championId === 'number') {
        // (summonerId, championId, callback, null)
        callback = arguments[2];
        options = null;
      } else if (arguments.length === 3 && typeof championId === 'object') {
        // (summonerId, options, callback, null)
        options = championId;
        callback = arguments[2];
        championId = null;
      }
    
      options = options || {};
      options.service = service;
      options.resource = 'champion-masteries/by-summoner/' + summonerId;
      options.resource += championId ? '/by-champion/' + championId : '';
    
      util.exec(options, callback);
    },
    getScore: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }
    
      options = options || {};
      options.service = service;
      options.resource = 'scores/by-summoner/' + summonerId;

      util.exec(options, callback);
    }
  }
}  