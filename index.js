var path = require("path");

module.exports = function pleaseUpgradeNode(pkgDir) {
  // This will give us the directory where please-upgrade-node was required from
  var requiredFrom = path.dirname(module.parent.filename);
  // If the user passes `pkgDir` as `'..'`, that should be resolved
  // relative to his __dirname
  var dir = pkgDir ? path.resolve(requiredFrom, pkgDir) : requiredFrom;
  var pkg = require(dir + "/package.json");
  var requiredVersion = pkg.engines.node.replace(">=", "");
  var currentVersion = process.version.replace("v", "");
  if (currentVersion < requiredVersion) {
    console.error(
      "%s requires at least version %s of Node, please upgrade",
      pkg.name,
      requiredVersion
    );
    process.exit(1);
  }
};
