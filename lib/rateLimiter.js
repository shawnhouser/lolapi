'use strict';

var _rates = [];
var _times = [];
var _counts = [];
var _clearFunctions = [];

module.exports = {
  createRateLimiter: function (limitString) {
    this.clearRateLimitInfo();
    /* Limit string Example - "10:10,500:600"             *
     * 10 calls per 10 seconds, 500 calls per 600 seconds */
    limitString = typeof limitString === 'string' ? limitString : config.defaultLimitString;
    limitString.split(',').forEach(function(element, index, array) {
      var timeAndRate = element.split(':');
      _rates[index] = timeAndRate[0];
      _times[index] = timeAndRate[1] * 1000;
    });
    for(var i = 0; i < _rates.length; i++){
      _counts[i] = 0;
    }

    for(let i = 0; i < _counts.length; i++){
      _clearFunctions[i] = setInterval(function(){
        _counts[i] = 0;
      }, _times[i]);
    }
  },

  clearRateLimitInfo: function(){
    _rates = [];
    _times = [];
    _counts = [];
    for(var i in _clearFunctions){
      clearInterval(_clearFunctions[i]);
    }
  },

  schedule: function (fn) {
    var canItRun = _counts.every(function(element, index, array){
      return element < _rates[index];
    });
    if(canItRun){
      fn();
      for(var i = 0; i < _counts.length;i++){
        _counts[i]++;
      }
    } else {
      setTimeout(function(){
        this.schedule(fn)
      }.bind(this), _times[0])
    }
  }
};