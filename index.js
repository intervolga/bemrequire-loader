const loaderUtils = require('loader-utils');
const nodeEval = require('node-eval');
const path = require('path');

/**
 * BemBH loader
 *
 * @param {String} source
 * @return {String}
 */
function bemRequireLoader(source) {
  const bemFs = nodeEval(source);

  const targets = [];
  const self = this;
  bemFs.forEach((fileName) => {
    const modulePath = path.resolve(fileName);
    self.addDependency(modulePath);
    const request = loaderUtils.stringifyRequest(self, modulePath);
    targets.push('require(' + request + ')');
  });

  return targets.join(',\n');
}

module.exports = bemRequireLoader;
