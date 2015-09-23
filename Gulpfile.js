/**
 * Useful resources:
 * - https://gist.github.com/danharper/3ca2273125f500429945
 * - https://www.npmjs.com/package/vinyl-source-stream
 * - https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
 */

var source = require('vinyl-source-stream');  // converts text streams info vinyl streams
var buffer = require('vinyl-buffer');         // buffer stuff for plugins that can't handle streams
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var gulp = require('gulp');

gulp.task('browserify', function() {
  // creates a stream.Readable with the result of the browserify transform
  var stream = browserify({entries: './www/main.js', debug: true}).transform(babelify).bundle();

  stream
    .pipe(source('app.js'))                   // creates a vinyl-stream that can be further processed
    .pipe(buffer())                           // sourcemaps can't work on streams, need to buffer
    .pipe(sourcemaps.init({loadMaps: true}))  // load existing source maps
    .pipe(uglify())                           // smash it
    .on('error', console.error)               // gulp made a boo boo
    .pipe(sourcemaps.write('./'))             // write sourcemaps to ./www/dist/app.js.map
    .pipe(gulp.dest('./www/dist'))            // writes the result to ./www/dist/app.js
});

gulp.task('build', ['browserify']);
