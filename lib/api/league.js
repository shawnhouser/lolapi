module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    getBySummonerId: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.LEAGUE_BY_SUMMONER_FULL;
      options.summonerId = summonerId;

      util.exec(options, callback);
    },

    getEntriesBySummonerId: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.LEAGUE_BY_SUMMONER;
      options.summonerId = summonerId;

      util.exec(options, callback);
    },

    getChallenger: function (type, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CHALLENGER_LEAGUE;
      options.query = {
        type: type || 'RANKED_SOLO_5x5'
      };

      util.exec(options, callback);
    }
  };

};