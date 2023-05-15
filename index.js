var semver = require('semver')

module.exports = function pleaseUpgradeNode(pkg, opts) {
  var opts = opts || {}

  var minVersion = semver.minVersion(pkg.engines.node)
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    if (opts.message) {
      console.error(opts.message(minVersion))
    } else {
      if (semver.lt(process.version, minVersion)) {
        console.error(
          pkg.name +
            ' requires at least version ' +
            minVersion +
            ' of Node, please upgrade'
        )
      } else {
        console.error(
          pkg.name +
            ' requires version range "' +
            pkg.engines.node +
            '" of Node, while currently on ' +
          process.version
        )
      }
    }

    if (opts.hasOwnProperty('exitCode')) {
      process.exit(opts.exitCode)
    } else {
      process.exit(1)
    }
  }
}
