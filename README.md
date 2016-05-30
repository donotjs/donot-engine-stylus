donot-engine-stylus
===================

[![Build Status](https://travis-ci.org/trenskow/donot-engine-stylus.svg?branch=master)](https://travis-ci.org/trenskow/donot-engine-stylus)

[Stylus](http://npmjs.org/packages/stylus) rendering engine for [donot](http://github.com/trenskow/donot).

# Usage

Using the Stylus donot engine plug-in is pretty easy.

	var http = require('http'),
	    donot = require('donot'),
	    stylus = require('donot-engine-stylus');

    var server = http.createServer(donot(__dirname + '/public', {
        engines: [
        	stylus({
        		minify: true
        	})
        ]
    }));

    server.listen(8000);

Now `.styl` files in the `/public` folder will automatically be compiled, rendered and served as `.css` files.

# Options

There is only one available option for the Stylus engine plug-in.

| Name       | Type    | Default | Description |
|:-----------|:--------|:--------|:------------|
| **minify** | Boolean | `true`  | Minify CSS. |

# License

MIT
