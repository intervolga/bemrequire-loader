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
  bemFs.forEach((source) => {
    if (source['raw']) {
      targets.push(source['raw']);
    } else if (source['require']) {
      const modulePath = path.resolve(source['require']);
      self.addDependency(modulePath);
      const request = loaderUtils.stringifyRequest(self, modulePath);
      targets.push('require(' + request + ');');
    } else {
      return Error('Wrong input: ' + JSON.stringify(source));
    }
  });

  return targets.join('\n');
}

module.exports = bemRequireLoader;
