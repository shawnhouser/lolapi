var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#match', function () {
    var accountId = 76833;
    var matchId = 3160143236;
    it('should return a collection of twenty recent games', function (done) {
      api.Match.getByAccount(accountId, true, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.matches).to.be.ok;
        expect(result.matches).to.have.length(20);
        done();
      });
    });

    it('should return a collection of ranked games', function (done) {
      api.Match.getByAccount(accountId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.matches).to.be.ok;
        expect(result.matches.length).to.be.at.least(10);
        done();
      });
    });

    it('should return a game', function (done) {
      api.Match.get(matchId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.platformId).to.be.ok;
        expect(result.teams).to.be.ok;
        expect(result.gameId).to.equal(matchId);
        done();
      });
    });

    it('should return a match with timeline', function (done) {
      api.Match.getTimeline(matchId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');        
        expect(result.frames).to.be.an('array');
        done();
      });
    });

  });

});