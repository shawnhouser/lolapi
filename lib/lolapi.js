'use strict';

module.exports = function (apiKey, platform, options) {

  var config = require('./config');
  var util = require('./util');

  util.setApiKey(apiKey);
  util.setPlatform(platform);

  if (options) {
    if (options.useRedis) {
      util.enableRedis(options.port, options.host, options.options);
    }
    if (options.cacheTTL) {
      util.setCacheTTL(options.cacheTTL);
    }
  }

  var api = {};
  api.Champion = require('./api/champion');
  api.ChampionMastery = require('./api/championMastery');
  api.Match = require('./api/match');
  api.Spectator = require('./api/spectator');
  api.Static = require('./api/static');
  api.Status = require('./api/status');
  api.Summoner = require('./api/summoner');

  api.setRateLimit = util.setRateLimit;

  return api;

};