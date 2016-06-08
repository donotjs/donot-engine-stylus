'use strict';

const fs = require('fs');
const stylus = require('stylus');
const Transform = require('@donotjs/donot-transform');

class StylusTransform extends Transform {

	constructor(opt) {
		super();
		this.options = opt || {};
	}

	canTransform(filename) {
		return /\.css$/i.test(filename);
	}

	allowAccess(filename) {
		return !/\.styl$/i.test(filename);
	}

	map(filename) {
		return filename.replace(/\.css$/, '.styl');
	}

	compile(filename, data) {
		return new Promise((resolved, rejected) => {
			var str = data.toString();
			var style = stylus(str)
									.set('filename', filename)
									.set('sourcemap', true)
									.set('cache', false)
									.set('compress', false);
			style.render((err, css) => {
				if (err) return rejected(err);
				var files = stylus(str).deps(filename);
				resolved({
					data: new Buffer(css),
					files: [filename].concat(files),
					map: style.sourcemap
				});
			});
		});
	}

}

exports = module.exports = StylusTransform;
