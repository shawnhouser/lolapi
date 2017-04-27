'use strict';
module.exports = (function() {

  var RateLimiter = function (secondsPerCall) {
    this._msPerCall = secondsPerCall * 1000;
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