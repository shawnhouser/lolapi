module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    get: function(championId, options, callback){
      championId = util.find('number', arguments);
      options =    util.find('object', arguments);
      callback =   util.find('function', arguments);
  
      options = options || {};
      options.service = 'platform';
      options.resource = 'champions';
      options.resource += championId ? '/' + championId.toString() : '';

      util.exec(options, callback);
    }
  };

};