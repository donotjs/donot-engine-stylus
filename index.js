var stylus = require('stylus');

exports = module.exports = function(opt) {

  var options = opt || {};

  return {
    map: {
      '.css': '.styl'
    },
    encoding: options.encoding || 'utf8',
    compile: function(file, data, opt, cb) {
      var files;
      source = stylus.render(data, { filename: file }, function(err, source) {
        if (err) return cb(err);
        var files = stylus(data).deps(file);
        cb(null, source, [file].concat(files));
      });
    }
  };
};
