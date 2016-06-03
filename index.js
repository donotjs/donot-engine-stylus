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

	compile(srcFilename, destFilename) {
		return new Promise((resolved, rejected) => {
			fs.readFile(srcFilename, 'utf8', (err, data) => {
				if (err) return rejected(err);
				var style = stylus(data)
				            .set('filename', srcFilename)
				            .set('sourcemap', true)
				            .set('cache', false);
				style.render((err, css) => {
					if (err) return rejected(err);
					var files = stylus(data).deps(srcFilename);
					fs.writeFile(destFilename, css, 'utf8', (err) => {
						if (err) return rejected(err);
						resolved({
							files: [srcFilename].concat(files),
							map: style.sourcemap
						});
					});
				});
			});
		});
	}

}

exports = module.exports = StylusTransform;
