var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#games', function () {

    it('should return a collection of ten recent games', function (done) {
      var summonerId = 71054;

      api.Game.recent(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.games).to.be.ok;
        expect(result.games).to.have.length(10);
        done();
      });
    });

    it('should return featured games', function (done) {
      api.Game.featured(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.gameList).to.be.ok;
        expect(result.gameList).to.have.length(5);
        done();
      });
    });

  });

});