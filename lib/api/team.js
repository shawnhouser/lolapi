module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (teamId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.TEAM_ID;
      options.teamId = teamId;

      util.exec(options, callback);
    },

    getBySummonerId: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.TEAM_BY_SUMMONER;
      options.summonerId = summonerId;

      util.exec(options, callback);
    }
  };

};