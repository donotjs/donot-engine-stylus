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
			return transform.canTransform('my.css').should.eventually.be.true;
		});

		it ('should return false when filename is .styl', () => {
			return transform.canTransform('my.styl').should.eventually.be.false;
		});

		it ('should return false when filename is .styl', () => {
			return transform.allowAccess('my.styl').should.eventually.be.false;
		});

		it ('should return true when filename is .css', () => {
			return transform.allowAccess('my.css').should.eventually.be.true;
		});

		it ('should return error on malformed stylus', () => {
			return transform.compile(malformedFile, malformed).should.eventually.be.rejected;
		});

		it ('should return css on valid stylus', () => {
			return transform.compile(testFile, test).should.eventually.deep.equal({
				data: "body {\n  width: 100%;\n}\n/*# sourceMappingURL=test/data/test.css.map */",
        files: [
          __dirname + "/data/test.styl"
        ],
        map: {
          file: "test.css",
          mappings: "AAAA;EACC,OAAO,KAAP",
          names: [],
          sources: [
            "test/data/test.styl"
          ],
          version: 3
				}
			});
		});

	});

});
