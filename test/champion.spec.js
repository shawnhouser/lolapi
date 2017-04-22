var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#champion', function () {

    it('should return one champion given a valid Id', function (done) {
      var championId = 10;

      api.Champion.get(championId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        done();
      });
    });

    it('should return all champions', function (done) {
      api.Champion.get(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.champions).to.be.ok;
        expect(result.champions.length).to.be.at.least(100);
        done();
      });
    });

    it('should return all free to play champions', function (done) {
      api.Champion.get({ freeToPlay: true }, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.champions).to.be.ok;
        expect(result.champions.length).to.be.at.least(10);
        done();
      });
    });

  });

});