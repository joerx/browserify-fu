var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var fs = require('fs');

var b = watchify(browserify('./www/main.js', watchify.args));

function bundle() {
  b.transform(babelify)
    .bundle()
    .on('error', console.error)
    .pipe(fs.createWriteStream('./www/bundle.js'));
}

b.on('update', bundle);
b.on('time', function(t) {
  console.log('./www/bundle.js written in ' + t + 'ms');
});

bundle();
