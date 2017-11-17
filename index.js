var semver = require('semver')

module.exports = function (pkg) {
  if (!pkg.engines || !pkg.engines.node) {
    console.error(
      "provided package.json data does not " +
      "include a required version of Node:"
    )
    console.error(JSON.stringify(pkg, null, 2))
  }
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    console.error(
      "%s requires a version of Node matching `%s`; you're running %s. Please upgrade!",
      pkg.name,
      pkg.engines.node,
      process.version
    );
    process.exit(1);
  }
};
