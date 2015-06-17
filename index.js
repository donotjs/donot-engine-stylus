var stylus = require('stylus');
var CleanCSS = require('clean-css');

exports = module.exports = function(opt) {

  var options = opt || {};

  options.minify = options.minify !== false;

  return {
    map: {
      '.css': '.styl'
    },
    encoding: options.encoding || 'utf8',
    compile: function(file, data, opt, cb) {
      var files;
      source = stylus.render(data, { filename: file, cache: false }, function(err, source) {
        if (err) return cb(err);
        var files = stylus(data).deps(file);
        // Minify if selected (default: true)
        if (options.minify === true) {
          source = new CleanCSS().minify(source).styles;          
        }
        cb(null, source, [file].concat(files));
      });
    }
  };
};
