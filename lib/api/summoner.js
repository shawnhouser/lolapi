module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    get: function (summonerIdentification, options, callback) {
      summonerIdentification = util.find(['number','string'], arguments);
      options =                util.find('object', arguments);
      callback =               util.find('function', arguments);

      options = options || {};
      options.service = 'summoner';
      options.resource = 'summoners/';
      options.resource += !Number.isInteger(summonerIdentification) ? 'by-name/' : '';
      options.resource += summonerIdentification;

      util.exec(options, callback);
    },

    getByAccountId: function (accountId, options, callback) {
      accountId = util.find('number', arguments);
      options =   util.find('object', arguments);
      callback =  util.find('function', arguments);

      options = options || {};
      options.service = 'summoner';
      options.resource = 'summoners/by-account/' + accountId;

      util.exec(options, callback);
    },

    getRunes: function (summonerId, options, callback) {
      summonerId = util.find('number', arguments);
      options =    util.find('object', arguments);
      callback =   util.find('function', arguments);

      options = options || {};
      options.service = 'platform';
      options.resource = 'runes/by-summoner/' + summonerId;

      util.exec(options, callback);
    },

    getMasteries: function (summonerId, options, callback) {
      summonerId = util.find('number', arguments);
      options =    util.find('object', arguments);
      callback =   util.find('function', arguments);

      options = options || {};
      options.service = 'platform';
      options.resource = 'masteries/by-summoner/' + summonerId;

      util.exec(options, callback);
    },
  };

};