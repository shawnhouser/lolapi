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
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri[championId ? 'STATIC_CHAMPION_ID' : 'STATIC_CHAMPION'];
	  options.championId = championId;
      options.static = true;
	  options.query = {
        locale: options.locale || null,
        version: options.version || null,
        dataById: options.dataById || null,
        champData: options.champData || null
      };

	  util.exec(options, callback);
	},

    getItem: function (itemId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_ITEM_ID;
      options.itemId = itemId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        itemData: options.itemData || null
      };

      util.exec(options, callback);
    },

    getMasteries: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_MASTERY;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        masteryListData: options.masteryListData || null
      };

      util.exec(options, callback);
    },

    getMastery: function (masteryId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_MASTERY_ID;
      options.masteryId = masteryId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        masteryData: options.masteryData || null
      };

      util.exec(options, callback);
    },

    getRunes: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_RUNE;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        runeListData: options.runeListData || null
      };

      util.exec(options, callback);
    },

    getRune: function (runeId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_RUNE_ID;
      options.runeId = runeId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        runeData: options.runeData || null
      };

      util.exec(options, callback);
    },

    getSummonerSpells: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_SUMMONER_SPELL;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        dataById: options.dataById || null,
        spellData: options.spellData || null
      };

      util.exec(options, callback);
    },

    getSummonerSpell: function (summonerSpellId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_SUMMONER_SPELL_ID;
      options.summonerSpellId = summonerSpellId;
      options.static = true;
      options.query = {
        locale: options.locale || null,
        version: options.version || null,
        spellData: options.spellData || null
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