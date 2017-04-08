module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    get: function (summonerIdentification, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.service = 'summoner';
      options.resource = 'summoners/';
      options.resource += !Number.isInteger(summonerIdentification) ? 'by-name/' : '';
      options.resource += summonerIdentification;

      util.exec(options, callback);
    },

    getByAccountId: function (accountId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.service = 'summoner';
      options.resource = 'summoners/by-account/' + accountId;

      util.exec(options, callback);
    },

    getRunes: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.service = 'platform';
      options.resource = 'runes/by-summoner/' + summonerId;

      util.exec(options, callback);
    },

    getMasteries: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.service = 'platform';
      options.resource = 'masteries/by-summoner/' + summonerId;

      util.exec(options, callback);
    },
  };

};