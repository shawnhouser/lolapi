module.exports = function (platform) {
  'use strict';

  var util = require('../util')(platform);

  return {
    champion: function(championId, options, callback){
      if (arguments.length === 1 && typeof championId === 'function') {
        // (callback, null, null)
        championId = null;
        options = null;
        callback = arguments[0];
      } else if (arguments.length === 2 && typeof championId === 'object'){
        // (options, callback, null)
        championId = null;
        options = arguments[0];
        callback = arguments[1];
      } else if (arguments.length === 2 && typeof championId === 'number') {
        // (championId, callback, null)
        championId = arguments[0];
        options = null;
        callback = arguments[1];
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'champions/';
      options.resource += championId ? championId : '';
      options.static = true;

      util.exec(options, callback);
    },

    item: function(itemId, options, callback){
      if (arguments.length === 1 && typeof itemId === 'function') {
        // (callback, null, null)
        itemId = null;
        options = null;
        callback = arguments[0];
      } else if (arguments.length === 2 && typeof itemId === 'object'){
        // (options, callback, null)
        itemId = null;
        options = arguments[0];
        callback = arguments[1];
      } else if (arguments.length === 2 && typeof itemId === 'number') {
        // (itemId, callback, null)
        itemId = arguments[0];
        options = null;
        callback = arguments[1];
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'items/';
      options.resource += itemId ? itemId : '';
      options.static = true;

      util.exec(options, callback);
    },

    mastery: function(masteryId, options, callback){
      if (arguments.length === 1 && typeof masteryId === 'function') {
        // (callback, null, null)
        masteryId = null;
        options = null;
        callback = arguments[0];
      } else if (arguments.length === 2 && typeof masteryId === 'object'){
        // (options, callback, null)
        masteryId = null;
        options = arguments[0];
        callback = arguments[1];
      } else if (arguments.length === 2 && typeof masteryId === 'number') {
        // (masteryId, callback, null)
        masteryId = arguments[0];
        options = null;
        callback = arguments[1];
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'masteries/';
      options.resource += masteryId ? masteryId : '';
      options.static = true;

      util.exec(options, callback);
    },

    rune: function(runeId, options, callback){
      if (arguments.length === 1 && typeof runeId === 'function') {
        // (callback, null, null)
        runeId = null;
        options = null;
        callback = arguments[0];
      } else if (arguments.length === 2 && typeof runeId === 'object'){
        // (options, callback, null)
        runeId = null;
        options = arguments[0];
        callback = arguments[1];
      } else if (arguments.length === 2 && typeof runeId === 'number') {
        // (runeId, callback, null)
        runeId = arguments[0];
        options = null;
        callback = arguments[1];
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'runes/';
      options.resource += runeId ? runeId : '';
      options.static = true;

      util.exec(options, callback);
    },

    summonerSpell: function(summonerSpellId, options, callback){
      if (arguments.length === 1 && typeof summonerSpellId === 'function') {
        // (callback, null, null)
        summonerSpellId = null;
        options = null;
        callback = arguments[0];
      } else if (arguments.length === 2 && typeof summonerSpellId === 'object'){
        // (options, callback, null)
        summonerSpellId = null;
        options = arguments[0];
        callback = arguments[1];
      } else if (arguments.length === 2 && typeof summonerSpellId === 'number') {
        // (summonerSpellId, callback, null)
        summonerSpellId = arguments[0];
        options = null;
        callback = arguments[1];
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'summoner-spells/';
      options.resource += summonerSpellId ? summonerSpellId : '';
      options.static = true;

      util.exec(options, callback);
    },

    getRealm: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'realms';
      options.static = true;

      util.exec(options, callback);
    },

    getVersions: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'versions';
      options.static = true;

      util.exec(options, callback);
    },

    getProfileIcons: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'profile-icons';
      options.static = true;

      util.exec(options, callback);
    },

    getMaps: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'maps';
      options.static = true;

      util.exec(options, callback);
    },

    getVersions: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'versions';
      options.static = true;

      util.exec(options, callback);
    },
    
    getLanguages: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'languages';
      options.static = true;

      util.exec(options, callback);
    },

    getLanguageStrings: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }
      options = options || {};
      options.service = 'static-data';
      options.resource = 'language-strings';
      options.static = true;

      util.exec(options, callback);
    },
  };

};