var semverCompare = require('semver-compare')

module.exports = function pleaseUpgradeNode(pkg, opts) {
  var opts = opts || {}
  var requiredVersion = pkg.engines.node.replace('>=', '')
  var currentVersion = process.version.replace('v', '')
  if (semverCompare(currentVersion, requiredVersion) === -1) {
    let errMsg
    if (opts.message) {
      errMsg = opts.message(requiredVersion)
    } else {
      errMsg = pkg.name +
          ' requires at least version ' +
          requiredVersion +
          ' of Node, please upgrade'
      
    }

    console.error(errMsg)

    if (opts.hasOwnProperty('exitCode')) {
      process.exitCode = opts.exitCode
    } else {
      process.exitCode = 1
    }
    
    throw new Error(errMsg)
  }
}
