'use strict';
var util = require('../util');

module.exports = {
  getChallenger: function (queue, options, callback) {
    queue =        util.find('string', 1, arguments);
    options =      util.find('object', arguments);
    callback =     util.find('function', arguments);
    
    options = options || {};
    options.service = 'league';
    options.resource = 'challengerleagues/by-queue/' + queue;
  
    util.exec(options, callback);
  },

  getMaster: function (queue, options, callback) {
    queue =        util.find('string', 1, arguments);
    options =      util.find('object', arguments);
    callback =     util.find('function', arguments);
    
    options = options || {};
    options.service = 'league';
    options.resource = 'challengerleagues/by-queue/' + queue;
  
    util.exec(options, callback);
  },

  getScore: function (summonerId, options, callback) {
    summonerId = util.find('number', arguments);
    options =    util.find('object', arguments);
    callback =   util.find('function', arguments);
  
    options = options || {};
    options.service = 'champion-mastery';
    options.resource = 'scores/by-summoner/' + summonerId;

    util.exec(options, callback);
  }
};
