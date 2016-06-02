/*jshint expr: true*/

'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

const StylusTransform = require('../');

const testFile = path.normalize(__dirname + '/data/test.styl');
const malformedFile = path.normalize(__dirname + '/data/malformed.styl');

const transform = new StylusTransform();

describe('stylus', () => {

	var test;
	var malformed;
	before(() => {
		test = fs.readFileSync(testFile, { encoding: 'utf8' });
		malformed = fs.readFileSync(malformedFile, { encoding: 'utf8' });
	});

	describe('compiler', () => {

		it ('should return true when filename is .css', () => {
			transform.canTransform('my.css').should.eventually.be.true;
		});

		it ('should return false when filename is .styl', () => {
			transform.canTransform('my.styl').should.eventually.be.false;
		});

		it ('should return true when filename is .styl', () => {
			transform.allowAccess('my.styl').should.eventually.be.true;
		});

		it ('should return false when filename is .css', () => {
			transform.allowAccess('my.css').should.eventually.be.false;
		});

		it ('should return error on malformed stylus', () => {
			transform.compile(malformedFile, malformed).should.eventually.be.rejected;
		});

		it ('should return css on valid stylus (non-minify)', () => {
			transform.compile(testFile, test).then((data) => {
				expect(data).to.be.a('string');
				expect(data).to.be.equal('body {\n  width: 100%;\n}\n');
			}).should.eventually.be.fulfilled;
		});

		it ('should return css on valid stylus', () => {
			transform.compile(testFile, test).then((data) => {
				expect(data).to.be.a('string');
				expect(data).to.be.equal('body{width:100%}');
			}).should.eventually.be.fulfilled;
		});

	});

});
