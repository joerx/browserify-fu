# Browserify Demo Project

## Setup

Install browserify via `npm -g install browserify` or export `PATH=./node_modules/.bin/:$PATH` to
use binaries installed locally via `npm install`.

## v0.1 Via CLI

Allows to use Node.js style `require()` in the browser by bundling all JS files in into a single
`bundle.js`.

- Install node packages via `npm install`
- Include `bundle.js` in your html files
- CLI: `browserify main.js -o bundle.js` to generate `bundle.js` from `main.js` (see `build.sh`)

## v0.2 Via API

Browserify itself is a node module that provides a streaming API. We can use this API to create
custom build scripts.

- Install deps via npm as before
- Run `node build.js` to generate the bundle file
- Check `./build.js` to see how it works

## v0.3 With Transforms

Browserify allows additional transforms source files will pass before being browsierified. Allows
stuff like Coffeescript sources to be translated to JS. We use ES2015 to ES5 for a sample.

- Instructions for browserify via https://babeljs.io/docs/setup/#browserify
- Install `babelify` via npm, hook it into the transformation pipe and enjoy ES2015 awesomeness
- CLI: use `-t` flag to add transforms: `browserify main.js -t babelify -o bundle.js`

## v0.4 Build Systems

Running build by hand from CLI is tedious sometimes. Integrating with your preferred editor could
make life a lot easier. For sublime-text we can use a project specific build system. See the
`*.sublime-project` file for details.

## v0.5 Watch Me!

Having a shortcut is cool, but still one keypress too much. How about automatic build whenever
something changes? Meet `watchify`.

- Can integrate with browserify API, but not exactly trivial (see `./watch.js`)
- CLI: use like babelify: `watchify $input -o $output`, etc. (won't output anything, but works)

## v0.6 Source Maps

Bundled sources are hard to debug since the original files names and line numbers are lost.
Browserify can include a source map inside the bundled file to make debugging easier.

- Source map is appended as base64-encoded data url to the end of `bundle.js`
- Obviously the resulting bundle will be larger: `bundle.js` has 669k vs. 244k w/o source map
- See `build.js` for details. (`DEBUG=1 node build.js` to generate bundle w/ source maps)
- CLI: use `--debug` flag for `browserify`

## v0.7 Uglify

Uglify will reduce the file size by getting rid of anything needed by humans but not browsers to
read the code (comment, line breaks, verbose symbol names, etc.).

- Uglify's top-level API sucks, no support for streams, only files or blobs (aka large strings)
- Will lose source maps. Can be persuaded, but that's not trivial ([see here for a similar scenario](http://tarantsov.com/WorkflowThu/source-maps-with-coffeescript-and-uglify-js/)),
  we'll skip it for now and use `gulp` later to fix it.
- CLI: pipe it n' smoke it: `browserify www/main.js | uglify > www/bundle.min.js`

### Sourcemap Considerations

The missing sourcemap in the minified version is probably not as big a deal as it first seems:

- Would need to pass the `debug` flag into browserify to have it in the first place.
- In a production env we would not want to load the source map, minified or not
- As a result we'd have two different builds anyway: debug (not minified, embedded source map) vs.
  production (minified, no source map)

## Build Systems

### v0.8 Gulp

Tools like Gulp or Grunt are popular choices for build systems in the JS world. A custom script
could do the job in a simple project, but a build system can add structure and useful tools for more
complex installments.

- Gulp works on streams wrapped into [vinyl objects or so](https://medium.com/@contrahacks/gulp-3828e8126466)
- Need some extra haggling with vinyl, buffers, etc. to get things to work, see `Gulpfile.js`
- As a bonus, we get source maps all the way to the original files, even for minified code
- CLI: `gulp build`, watch is not implemented here [but doable](https://gist.github.com/danharper/3ca2273125f500429945)

### v0.9 Grunt

Grunt is an alternative to Gulp. It doesn't think in pipes and streams, offering a more
conventional structure of tasks and configuration. It's less performant (and less elegant) when
working with file transformation, but more flexible in what can be done with it.

- Grunt thinks in tasks performed on actual files, not in virtual files and streams
- Mostly wraps around other tools to perform common project tasks (compile, test, deploy, ...)
- See `Gruntfile.js`. Wrote my own `browserify` task (`bundle`) for demo

### Grunt vs Gulp

Good overview [on the differences is here](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4),
Personally I'd approach the decision differently though. As with any good answer on a complex
problem, it starts with 'depends':

- when Comparing `Gulpfile.js` with `Gruntfile.js`, Gulp is more to the point, less verbose and
  more 'natural' dealing with the file transformation
- However, Grunt can cover more scenarios that can't be easily expressed as stream transformations
  (e.g. running tests, deploying code, building docker images)
- My personal rule of thumb:
  - frontend only, with a lot of 'xyz to js', 'xyss to css', 'abc-ify', etc. - Gulp shines
  - backend usually 'test', 'lint', 'style-check', 'deploy', etc. - Grunt makes more sense
  - if in doubt: Grunt, might be less perfect for some tasks, but still can likely cover everything
- Alternatively use Grunt wrapped around Gulp; comes with additional overhead though
