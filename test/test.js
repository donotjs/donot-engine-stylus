/*jshint expr: true*/

'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var engine = require('../');

var testFile = path.normalize(__dirname + '/data/test.styl');
var malformedFile = path.normalize(__dirname + '/data/malformed.styl');

describe('stylus', function() {

  var test;
  var malformed;
  before(function() {
    test = fs.readFileSync(testFile, { encoding: 'utf8' });
    malformed = fs.readFileSync(malformedFile, { encoding: 'utf8' });
  });

  describe('compiler', function() {

    it ('should return error on malformed stylus', function(done) {
      engine().compile(malformedFile, malformed, 'utf8', function(err, data) {
        expect(err).to.be.instanceof(Error);
        done();
      });
    });

    it ('should return css on valid stylus (non-minify)', function(done) {
      engine({minify: false}).compile(testFile, test, 'utf8', function(err, data) {
        expect(err).to.be.null;
        expect(data).to.be.a('string');
        expect(data).to.be.equal('body {\n  width: 100%;\n}\n');
        done();
      });
    });

    it ('should return css on valid stylus', function(done) {
      engine().compile(testFile, test, 'utf8', function(err, data) {
        expect(err).to.be.null;
        expect(data).to.be.a('string');
        expect(data).to.be.equal('body{width:100%}');
        done();
      });
    });

  });

});
