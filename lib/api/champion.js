module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    get: function(championId, options, callback){
      if (arguments.length === 1 && typeof championId === 'function') {
        // (callback, null, null)
        callback = arguments[0];
        championId = null;
        options = null;
      } else if(arguments.length === 2 && typeof championId === 'number'){
        // (championId, callback, null)
        callback = arguments[1];
        options = null;
      } else if(arguments.length === 2 && typeof championId === 'object'){
        // (options, callback, null)
        callback = arguments[1];
        championId = null;
      }

      options = options || {};
      options.service = 'platform';
      options.resource = 'champions';
      options.resource += championId ? '/' + championId.toString() : '';

      util.exec(options, callback);
    }
  };

};