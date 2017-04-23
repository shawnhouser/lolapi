module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    get: function (options, callback) {
	  options =  util.find('object', arguments);
	  callback = util.find('function', arguments);

      options = options || {};
      options.service = 'status';
      options.resource = 'shard-data';

      util.exec(options, callback);
    }
  };

};