module.exports = function (apiKey, platform, options) {
  'use strict';

  var config = require('./config');
  var util = require('./util')(platform);

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
  api.Champion = require('./api/champion')(platform);
  api.ChampionMastery = require('./api/championMastery')(platform);
  api.Spectator = require('./api/spectator')(platform);
  api.League = require('./api/league')(platform);
  api.Match = require('./api/match')(platform);
  api.Static = require('./api/static')(platform);
  api.Status = require('./api/status')(platform);
  api.Summoner = require('./api/summoner')(platform);

  api.setRateLimit = function (limitPer10s, limitPer10min) {
    util.setRateLimit(limitPer10s, limitPer10min);
  };

  return api;

};