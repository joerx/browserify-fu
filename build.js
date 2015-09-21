// You wouldn't normally write some ugly custom build script like this - Gulp or Grunt are the more
// fashionable options.

var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('uglify-js');
var fs = require('fs');

var debug = /^1|true$/i.test('' + process.env.DEBUG);
if (debug) console.log('debug mode');

var out = fs.createWriteStream('./www/bundle.js');
out.on('close', function() {
  console.log('uglify ...');
  doUglify();
});

console.log('browserify ...');
// See https://github.com/substack/node-browserify for API details
// - `.bundle()` returns stream.Readable, can be piped to file (or things like http.ServerResponse)
browserify('./www/main.js', {debug: true})
  .transform(babelify)
  .bundle()
  .on('error', console.error)
  .pipe(out);

// v0.7 - Uglify
function doUglify() {
  var result = uglify.minify(__dirname + '/www/bundle.js');
  fs.writeFile(__dirname + '/www/bundle.min.js', result.code, function() {
    console.log('done!');
  });
}
