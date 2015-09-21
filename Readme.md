
# 1 Browserify

## 1.1 Via CLI

Allows to use Node.js style `require()` in the browser by bundling all JS files in into a single
`bundle.js`.

- Install node packages via `npm install`
- Use `browserify` CLI to generate a single output file called `bundle.js` (see `build.sh`)
- Include `bundle.js` in your html files

## 1.2 Via API

Browserify itself is a node module that provides a streaming API. We can use this API to create
custom build scripts.

- Install deps via npm as before
- Run `node build.js` to generate the bundle file
- Check `./build.js` to see how it works
