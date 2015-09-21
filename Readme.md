# Browserify Demo Project

## v0.1 Via CLI

Allows to use Node.js style `require()` in the browser by bundling all JS files in into a single
`bundle.js`.

- Install node packages via `npm install`
- Use `browserify` CLI to generate a single output file called `bundle.js` (see `build.sh`)
- Include `bundle.js` in your html files

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
- Simply hook `babelify` into the transformation pipe and enjoy ES2015 awesomeness

