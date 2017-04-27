'use strict';
var util = require('../util');

module.exports = {
  get: function (options, callback) {
    options =  util.find('object', arguments);
    callback = util.find('function', arguments);

    options = options || {};
    options.service = 'status';
    options.resource = 'shard-data';

    util.exec(options, callback);
  }
};