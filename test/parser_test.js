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
    
    it('should return more than 20K items', function (done) {
      parser.readUCDLines(function (err, data) {
        if (err) done(err);
        data.length.should.be.above(29000);
        done();
      });
    });
  });
  describe('#loadIndexes', function (done) {

    it('should add at least 20K items to the codeMap', function (done) {
      parser.loadIndexes(function (err) {
        if (err) done(err);
        parser.codeMap.size.should.be.above(29000);
        done();
      });
    });

    it('codeMap should map "0020" to "SPACE"', function (done) {
      parser.loadIndexes(function (err) {
        if (err) done(err);
        parser.codeMap.get('0020').should.equal('SPACE');
        done();
      });
    });

    it('nameMap should map "SPACE" to set containing "0020"', function (done) {
      parser.loadIndexes(function (err) {
        if (err) done(err);
        parser.nameMap.get('SPACE').has("0020");
        done();
      });
    });

    it('nameMap should map "LATIN" to set with more than one item', function (done) {
      parser.loadIndexes(function (err) {
        if (err) done(err);
        parser.nameMap.get('LATIN').size.should.be.above(1);
        done();
      });
    });

  });
});
