'use strict';

const stylus = require('stylus');
const Transform = require('@donotjs/donot-transform');

class StylusTransform extends Transform {

	constructor(opt) {
		super();
		this.options = opt || {};
	}

	canTransform(filename) {
		return Promise.resolve(/\.css$/i.test(filename));
	}

	allowAccess(filename) {
		return Promise.resolve(!/\.styl$/i.test(filename));
	}

	map(filename) {
		return Promise.resolve(filename.replace(/\.css$/, '.styl'));
	}

	compile(filename, data, opt) {
		return new Promise((resolved, rejected) => {
			var style = stylus(data)
			            .set('filename', filename)
			            .set('sourcemap', true)
			            .set('cache', false);
			style.render(function(err, css) {
				if (err) return rejected(err);
				var files = stylus(data).deps(filename);
				resolved({
					data: css,
					files: [filename].concat(files),
					map: style.sourcemap
				});
			});
		});
	}

}

exports = module.exports = StylusTransform;
