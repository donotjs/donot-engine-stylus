smart-static-stylus
===================

[Stylus](http://npmjs.org/packages/stylus) rendering engine for [smart-static](http://github.com/trenskow/smart-static.js).

# Usage

Using the Stylus smart-static engine plug-in is pretty easy.

	var http = require('http');
	
	var smartStatic = require('smart-static');
    var stylus = require('smart-static-stylus');
    
    var server = http.createServer(smartStatic(__dirname + '/public', {
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

