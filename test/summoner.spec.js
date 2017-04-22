var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#summoner', function () {
    var summonerName = 'wickd';
    var summonerId = 71500;
    var accountId = 76833;

    it('should retrieve summoner by id', function (done) {
      api.Summoner.get(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.name.toLowerCase()).to.equal(summonerName);
        done();
      });
    });

    it('should retrieve summoner by accountId', function (done) {
      api.Summoner.getByAccountId(accountId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.name.toLowerCase()).to.equal(summonerName);
        done();
      });
    });

    it('should retrieve summoner by name', function (done) {
      api.Summoner.get(summonerName, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.name.toLowerCase()).to.equal(summonerName);
        done();
      });
    });

    it('should retrieve summoners runes', function (done) {
      api.Summoner.getRunes(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.summonerId).to.equal(summonerId);
        done();
      });
    });

    it('should retrieve summoners masteries', function (done) {
      api.Summoner.getMasteries(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.summonerId).to.equal(summonerId);
        done();
      });
    });

  });

});