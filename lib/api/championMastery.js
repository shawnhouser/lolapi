module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    getChampionMastery: function (summonerId, championId, options, callback) {
	  summonerId = util.find('number', 1, arguments);
	  championId = util.find('number', 2, arguments);
	  options =    util.find('object', arguments);
	  callback =   util.find('function', arguments);
	  
      options = options || {};
      options.service = 'champion-mastery';
      options.resource = 'champion-masteries/by-summoner/' + summonerId;
      options.resource += championId ? '/by-champion/' + championId : '';
    
      util.exec(options, callback);
    },
    getScore: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }
    
      options = options || {};
      options.service = 'champion-mastery';
      options.resource = 'scores/by-summoner/' + summonerId;

      util.exec(options, callback);
    }
  }
}  