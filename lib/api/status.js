module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    get: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.service = 'status';
      options.resource = 'shard-data';

      util.exec(options, callback);
    }
  };

};