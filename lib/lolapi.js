module.exports = function (apiKey, region, options) {
  'use strict';

  var config = require('./config');
  var util = require('./util');

  util.setApiKey(apiKey);
  util.setDefaultRateLimit();

  if (options) {
    if (options.useRedis) {
      util.enableRedis(options.port, options.host, options.options);
    }
    if (options.cacheTTL) {
      util.setCacheTTL(options.cacheTTL);
    }
  }

  var api = {};
  api.Champion = require('./api/champion')(region);
  api.ChampionMastery = require('./api/championMastery')(region);
  api.Game = require('./api/game')(region);
  api.League = require('./api/league')(region);
  api.Match = require('./api/match')(region);
  api.Static = require('./api/static')(region);
  api.Stats = require('./api/stats')(region);
  api.Status = require('./api/status')(region);
  api.Summoner = require('./api/summoner')(region);

  api.setRateLimit = function (limitPer10s, limitPer10min) {
    util.setRateLimit(limitPer10s, limitPer10min);
  };

  return api;

};