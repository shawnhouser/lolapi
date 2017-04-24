module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    champion: function(championId, options, callback){
      championId = util.find('number', arguments);
      options =    util.find('object', arguments);
      callback =   util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'champions/';
      options.resource += championId ? championId : '';
      options.static = true;

      util.exec(options, callback);
    },

    item: function(itemId, options, callback){
      itemId =   util.find('number', arguments);
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'items/';
      options.resource += itemId ? itemId : '';
      options.static = true;

      util.exec(options, callback);
    },

    mastery: function(masteryId, options, callback){
      masteryId = util.find('number', arguments);
      options =   util.find('object', arguments);
      callback =  util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'masteries/';
      options.resource += masteryId ? masteryId : '';
      options.static = true;

      util.exec(options, callback);
    },

    rune: function(runeId, options, callback){
      runeId =   util.find('number', arguments);
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'runes/';
      options.resource += runeId ? runeId : '';
      options.static = true;

      util.exec(options, callback);
    },

    summonerSpell: function(summonerSpellId, options, callback){
      summonerSpellId = util.find('number', arguments);
      options =         util.find('object', arguments);
      callback =        util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'summoner-spells/';
      options.resource += summonerSpellId ? summonerSpellId : '';
      options.static = true;

      util.exec(options, callback);
    },

    getRealm: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'realms';
      options.static = true;

      util.exec(options, callback);
    },

    getVersions: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'versions';
      options.static = true;

      util.exec(options, callback);
    },

    getProfileIcons: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'profile-icons';
      options.static = true;

      util.exec(options, callback);
    },

    getMaps: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'maps';
      options.static = true;

      util.exec(options, callback);
    },

    getVersions: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'versions';
      options.static = true;

      util.exec(options, callback);
    },
    
    getLanguages: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'languages';
      options.static = true;

      util.exec(options, callback);
    },

    getLanguageStrings: function (options, callback) {
      options =  util.find('object', arguments);
      callback = util.find('function', arguments);

      options = options || {};
      options.service = 'static-data';
      options.resource = 'language-strings';
      options.static = true;

      util.exec(options, callback);
    },
  };

};