var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#status', function () {

    it('should return lol-status info', function (done) {
      api.Status.get(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        done();
      });
    });

  });

});