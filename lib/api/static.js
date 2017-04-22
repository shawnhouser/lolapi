module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

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
      options.resource = 'champion/';
      options.resource += championId ? championId : '';

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
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri[itemId ? 'STATIC_ITEM_ID' : 'STATIC_ITEM'];
      options.itemId = itemId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        itemData: options.itemData || null,
        itemListData: options.itemListData || null
      };

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
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri[masteryId ? 'STATIC_MASTERY_ID' : 'STATIC_MASTERY'];
      options.masteryId = masteryId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        masteryData: options.masteryData || null,
        masteryListData: options.masteryListData || null
      };

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
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri[runeId ? 'STATIC_RUNE_ID' : 'STATIC_RUNE'];
      options.runeId = runeId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        runeData: options.runeData || null,
        runeListData: options.runeListData || null
      };

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
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri[summonerSpellId ? 'STATIC_SUMMONER_SPELL_ID' : 'STATIC_SUMMONER_SPELL'];
      options.summonerSpellId = summonerSpellId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        spellData: options.spellData || null,
        dataById: options.dataById || null
      };

      util.exec(options, callback);
    },

    getRealm: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_REALM;
      options.static = true;

      util.exec(options, callback);
    },

    getVersions: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_VERSIONS;
      options.static = true;

      util.exec(options, callback);
    }
  };

};