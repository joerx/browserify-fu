var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');

var debug = /^1|true$/i.test('' + process.env.DEBUG);

if (debug) console.log('debug mode');

// See https://github.com/substack/node-browserify for API details
// - `.bundle()` returns stream.Readable, can be piped to file (or things like http.ServerResponse)
browserify('./www/main.js', {debug: true})
  .transform(babelify)
  .bundle()
  .on('error', console.error)
  .on('end', console.log.bind(null, 'done'))
  .pipe(fs.createWriteStream('./www/bundle.js'));
