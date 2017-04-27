'use strict';
var util = require('../util');

module.exports = {
  getByAccount: function(accountId, recentGames, options, callback){
    accountId =   util.find('number', arguments);
    recentGames = util.find('boolean', arguments);
    options =     util.find('object', arguments);
    callback =    util.find('function', arguments); 
    
    options = options || {};
    options.service = 'match';
    options.resource = 'matchlists/by-account/' + accountId;
    options.resource += recentGames ? '/recent' : '';

    util.exec(options, callback);
  },

  get: function(matchId, options, callback){
    matchId =  util.find('number', arguments);
    options =  util.find('object', arguments);
    callback = util.find('function', arguments); 

    options = options || {};
    options.service = 'match';
    options.resource = 'matches/' + matchId;

    util.exec(options, callback);
  },
  
  getTimeline: function(matchId, options, callback){
    matchId =  util.find('number', arguments);
    options =  util.find('object', arguments);
    callback = util.find('function', arguments); 
    
    options = options || {};
    options.service = 'match';
    options.resource = 'timelines/by-match/' + matchId;

    util.exec(options, callback);
  }
};