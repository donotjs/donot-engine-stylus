donot-transform-stylus
======================

[![Build Status](https://travis-ci.org/donotjs/donot-transform-stylus.svg?branch=master)](https://travis-ci.org/donotjs/donot-transform-stylus)

[Stylus](http://npmjs.org/packages/stylus) rendering engine for [donot](http://github.com/donotjs/donot).

# Usage

Using the Stylus donot transform plug-in is pretty easy.

	var http = require('http'),
	    donot = require('donot'),
	    StylusTransform = require('donot-transform-stylus');

    var server = http.createServer(donot(__dirname + '/public', {
        transforms: [ new StylusTransform() ]
    }));

    server.listen(8000);

Now `.styl` files in the `/public` folder will automatically be compiled, rendered and served as `.css` files.

# License

MIT
