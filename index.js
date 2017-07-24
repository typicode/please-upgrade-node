module.exports = function (pkgDir) {
  var dir = pkgDir || '.'
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
