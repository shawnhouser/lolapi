module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (matchId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.MATCH;
      options.matchId = matchId;
      options.query = {
        includeTimeline: options.includeTimeline || false
      };

      util.exec(options, callback);
    },
    matchList: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.MATCH_HISTORY;
      options.summonerId = summonerId;
      options.query = {
        championIds: options.championIds || null,
        rankedQueues: options.rankedQueues || null,
        seasons: options.seasons || null,
        beginTime: options.beginTime || null,
        endTime: options.endTime || null,
        beginIndex: (options.beginIndex !== null && options.beginIndex !== undefined) ? options.beginIndex : null,
        endIndex: options.endIndex || null
      };

      util.exec(options, callback);
    }
  };

};