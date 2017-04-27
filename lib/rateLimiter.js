'use strict';
module.exports = (function() {

  var RateLimiter = function (limitString) {
    /* Limit string Example - "10:10;500:600"             *
     * 10 calls per 10 seconds, 500 calls per 600 seconds */
    limitString = typeof limitString === 'string' ? limitString : config.defaultLimitString;
    var rates = limitString.split(';').map(function(currentRateString) {
      var currentRate = currentRateString.split(':');
      return currentRate[1] / currentRate[0];
    });

    this._msPerCall = Math.max(...rates) * 1000;
    this._queue = [];

    setInterval(function(){
      var fn = this._queue.shift();
      if(fn){ fn(); }
    }.bind(this), this._msPerCall + 100);
  };

  RateLimiter.prototype.schedule = function (fn) {
    this._queue.push(fn);
  }

  return RateLimiter;
})();