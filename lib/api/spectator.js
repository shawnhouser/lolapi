module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    featured: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.service = 'spectator';
      options.resource = 'featured-games';

      util.exec(options, callback);
    },

    current: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.service = 'spectator';
      options.resource = 'active-games/by-summoner/' + summonerId;

      util.exec(options, callback);
    }
  };

};