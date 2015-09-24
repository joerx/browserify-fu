var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({

    bundle: {
      options: {
        debug: true
      },
      app: {
        src: './www/main.js',
        dest: './www/dist/app.js',
      }
    },

    uglify: {
      app: {
        options: {
          sourceMap: true,
          sourceMapRoot: './'
          // sourceMapIn: './www/dist/app.js'
        },
        files: {
          './www/dist/app.min.js': ['./www/dist/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['bundle', 'uglify']);

  grunt.registerMultiTask('bundle', function(config) {
    var options = this.options();
    var done = this.async();

    grunt.file.mkdir(path.dirname(this.data.dest));

    var b = browserify({entries: this.data.src, debug: !!options.debug}).transform(babelify);
    var dest = fs.createWriteStream(this.data.dest);
    dest.on('error', console.error);
    dest.on('close', done);

    b.bundle().pipe(dest);
  });
}
