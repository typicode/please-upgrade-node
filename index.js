var semver = require("semver");

module.exports = function(pkg) {
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    console.error(
      "%s requires at least version %s of Node, please upgrade",
      pkg.name,
      pkg.engines.node
    );
    process.exit(1);
  }
};
