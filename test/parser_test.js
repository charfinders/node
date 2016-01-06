var should = require('should');
var parser = require('../parser.js');

describe('Parser', function () {
  describe('#readUCDLines', function () {
    it('should return an array', function (done) {
      parser.readUCDLines(function (err, data) {
        if (err) done(err);
        data.should.have.property('length');
        done();
      });
    });
  });
});
