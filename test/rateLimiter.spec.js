var RateLimiter = require('../lib/rateLimiter');
var api = require('./api');
var expect = require('chai').expect;

describe('util', function () {

  describe('#rateLimiter', function () {

    it('should return featured games 11 times without failure', function (done) {
      var count = 0;

      function getFeaturedGames() {
        api.Spectator.featured(function (error, result) {
          expect(error).to.not.be.ok;

          if (++count < 11) {
            getFeaturedGames();
          } else {
            done();
          }
        });
      }

      getFeaturedGames();
    });

  });

});