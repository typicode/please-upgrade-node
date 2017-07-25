module.exports = function (pkgDir) {
  var dir = pkgDir || '../..';
  var pkg;
  if (typeof pkgDir === 'object'){
    pkg = pkgDir;
  } else {
    pkg = require(dir + "/package.json");
  }

  var requiredVersion = pkg.engines.node.replace(">=", "");
  var currentVersion = process.version.replace("v", "");
  if (currentVersion < requiredVersion) {
    console.error(
      "\n%s requires at least version %s of Node, please upgrade\n",
      pkg.name,
      requiredVersion
    );
    process.exit(1);
  }
};
