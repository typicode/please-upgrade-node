var semver = require("semver");

module.exports = function(pkg) {
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    console.error(
      "%s requires a Node version that satisfies %s, please upgrade",
      pkg.name,
      pkg.engines.node
    );
    process.exit(1);
  }
};
