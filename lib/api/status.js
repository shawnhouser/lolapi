module.exports = function (region) {
  'use strict';

  var util = require('../util');
  var service = 'status';

  return {
    get: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.service = service;
      options.resource = 'shard-data';

      util.exec(options, callback);
    }
  };

};