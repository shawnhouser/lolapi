var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#ChampionMastery', function () {

    it('should return a players mastery score', function (done) {
      var summonerId = 71054;
      api.ChampionMastery.getScore(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        done();
      });
    });

    it('should return a players top champions', function (done) {
      var summonerId = 71054;
      api.ChampionMastery.getTop(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        done();
      });
    });

    it('should return all masteries on champions for a player', function (done) {
      var summonerId = 71054;
      api.ChampionMastery.getChampionMastery(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        done();
      });
    });

    it('should return the mastery of a specific champion for a player', function (done) {
      var summonerId = 71054;
      var championId = 10;
      api.ChampionMastery.getChampionMastery(summonerId, championId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        done();
      });
    });

  });

});