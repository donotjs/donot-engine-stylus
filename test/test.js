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
			expect(transform.canTransform('my.css')).to.be.true;
		});

		it ('should return false when filename is .styl', () => {
			expect(transform.canTransform('my.styl')).to.be.false;
		});

		it ('should return false when filename is .styl', () => {
			expect(transform.allowAccess('my.styl')).to.be.false;
		});

		it ('should return true when filename is .css', () => {
			expect(transform.allowAccess('my.css')).to.be.true;
		});

		it ('should return error on malformed stylus', () => {
			return transform.compile(malformedFile, malformed).should.eventually.be.rejected;
		});

		it ('should return css on valid stylus', () => {
			return transform.compile(testFile, test).then((result) => {
				expect(result.data).to.equal('body {\n  width: 100%;\n}\n/*# sourceMappingURL=test/data/test.css.map */');
				expect(result.files).to.be.an.array;
				expect(result.files[0]).to.be.a('string');
				expect(result.map).to.be.an.object;
			}).should.eventually.be.fulfilled;
		});

	});

});
