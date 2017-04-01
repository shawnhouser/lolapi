module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    recent: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.RECENT_GAMES;
      options.summonerId = summonerId;

      util.exec(options, callback);
    },

    featured: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.FEATURED_GAMES;
      options.endpoint = 'api.pvp.net';

      util.exec(options, callback);
    },

    current: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CURRENT_GAME;
      options.summonerId = summonerId;
      options.platformId = config.platforms[options.region].id;
      options.endpoint = 'api.pvp.net';

      util.exec(options, callback);
    }
  };

};