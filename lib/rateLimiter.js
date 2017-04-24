/**
 * Original Rate Limiter by @claudiowilson (https://github.com/claudiowilson/)
 */

module.exports = (function() {
  'use strict';

  var RateLimiter = function (maxOps, interval, allowBursts) {
    this._maxRate = allowBursts ? maxOps : maxOps / interval;
    this._interval = interval;
    this._allowBursts = allowBursts;

    this._numOps = 0;
    this._start = Date.now();
    this._queue = [];
  };

  RateLimiter.prototype.schedule = function (fn) {
    var rate = 0;
    var now = Date.now();
    var elapsed = now - this._start;

    if (elapsed > this._interval) {
      this._numOps = 0;
      this._start = now;
    }

    rate = this._numOps / (this._allowBursts ? 1 : elapsed);

    if (rate < this._maxRate) { // it can be called right now
      if (this._queue.length === 0) { // if the queue is empty
		this._numOps++;
        if (fn) {
          fn(); // if statement not needed
        }
      } else { // if there is something in the queue
		if (fn) {
          this._queue.push(fn); // never gets called
		}
        this._numOps++;
        this._queue.shift()();
      }
    } else { // it has to be called later
      if (fn) { // mostly function, error when testing limiting per 10s
        this._queue.push(fn);
      }

      setTimeout(function () {
        this.schedule();
      }.bind(this), 1 / this._maxRate);
    }
  };

  return RateLimiter;
})();