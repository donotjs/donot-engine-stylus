var stylus = require('stylus');

exports = module.exports = function() {
  return {
    map: {
      '.css': '.styl'
    },
    compile: function(file, data, encoding, cb) {
      var files;
      source = stylus.render(data, { filename: file }, function(err, source) {
        if (err) return cb(err);
        var files = stylus(data).deps(file);
        cb(null, source, [file].concat(files));
      });
    }
  };
};
