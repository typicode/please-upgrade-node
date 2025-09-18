import process from 'node:process'

export default function pleaseUpgradeNode(pkg = {}, opts = {}) {
  const requiredVersion = pkg.engines.node.replace('>=', '')
  const currentVersion = process.version.replace('v', '')
  if (compare(currentVersion, requiredVersion) === -1) {
    console.error(opts.message && typeof opts.message === 'function' ? opts.message(requiredVersion) : `${pkg.name} requires at least version ${requiredVersion} of Node, please upgrade`)
    process.exit(opts.hasOwnProperty('exitCode') ? opts.exitCode : 1)
  }
}

// from semver-compare
function compare(a, b) {
	const pa = a.split('.');
  const pb = b.split('.');
  for (let i = 0; i < 3; i++) {
    const na = Number(pa[i]);
    const nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
}