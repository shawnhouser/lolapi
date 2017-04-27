'use strict';
var util = require('../util');

module.exports ={
  featured: function (options, callback) {
    options =  util.find('object', arguments);
    callback = util.find('function', arguments);

    options = options || {};
    options.service = 'spectator';
    options.resource = 'featured-games';

    util.exec(options, callback);
  },

  current: function (summonerId, options, callback) {
    summonerId = util.find('number', arguments);
    options =    util.find('object', arguments);
    callback =   util.find('function', arguments);

    options = options || {};
    options.service = 'spectator';
    options.resource = 'active-games/by-summoner/' + summonerId;

    util.exec(options, callback);
  }
};