var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey, 'euw1');

module.exports = api;