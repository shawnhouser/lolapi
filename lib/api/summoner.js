module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (summonerIdentification, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;

      if(Number.isInteger(summonerIdentification) || util.isArrayOfIntegers(summonerIdentification)){
        options.uri = config.uri.SUMMONER_ID;
        options.summonerId = summonerIdentification;
      } else {
        options.uri = config.uri.SUMMONER_BY_NAME;
        options.summonerNames = summonerIdentification;
      }

      util.exec(options, callback);
    },

    getName: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_NAME;
      options.summonerId = summonerIds;

      util.exec(options, callback);
    },

    getRunes: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_RUNES;
      options.summonerId = summonerIds;

      util.exec(options, callback);
    },

    getMasteries: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_MASTERIES;
      options.summonerId = summonerIds;

      util.exec(options, callback);
    },


  };

};