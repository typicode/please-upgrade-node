# Please upgrade Node [![Build Status](https://travis-ci.org/typicode/please-upgrade-node.svg?branch=master)](https://travis-ci.org/typicode/please-upgrade-node) [![npm](https://img.shields.io/npm/v/please-upgrade-node.svg)](https://www.npmjs.com/package/please-upgrade-node)

> :information_desk_person: show a message to your users to upgrade Node instead of a stacktrace 

It's common for new Node users to miss the `npm` engines warning when installing a CLI. This package displays a beginner-friendly message if their Node version is below the one expected.

Example with [hotel](https://github.com/typicode/hotel) CLI:

```sh
$ node -v
0.12

$ hotel
hotel requires at least version 4 of Node, please upgrade
```

## Install

```sh
npm install please-upgrade-node
```

```js
// bin.js
require('please-upgrade-node')()
```

```js
// package.json
{ 
  "name": "super-cli",
  "bin": "./bin.js",
  "engines": { "node": ">=6" }
}
```

## Caveats

`please-upgrade-node` must be run before any other code. It's highly recommended to require it this way:

```js
#!/usr/bin/env node
require('please-upgrade-node')()
const other = require('some-other-package')
// ...
```

Also `>=` is the only operator supported by `please-upgrade-node` (e.g. `>=4`, `>=4.0`, `>=4.0.0`).



## API

__`pleaseUpgradeNode([pkgDir = '.'])`__

You can pass a `pkgDir` if your `package.json` is not at the same level:

```js
// ./package.json
require('please-upgrade-node')()

// ../../package.json
require('please-upgrade-node')('../..')
```

## Caveat

Make sure when requiring `please-upgrade-node` to not use syntax that is only supported in recent versions of Node.

For example, if you use `const` instead of `var`, `please-upgrade-node` won't work with Node `0.12`:

```js
const pleaseUpgradeNode = require('please-upgrade-node') // ← Will fail and exit here with Node 0.12,
pleaseUpgradeNode() // Message won't be displayed
```

To avoid any issues, the recommended syntax is `require('please-upgrade-node')()`.

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - :ok_hand: Prevents publishing a module with bad paths
* [husky](https://github.com/typicode/husky) - :dog: Git hooks made easy

Thanks to [zeit/serve](https://github.com/zeit/serve) for the error message inspiration.

## License

MIT - [Typicode :cactus:](https://github.com/typicode) - [Patreon](https://patreon.com/typicode)
