const loaderUtils = require('loader-utils');
const nodeEval = require('node-eval');
const path = require('path');

/**
 * BemBH loader
 *
 * @param {String|Object} source
 * @return {String}
 */
function bemRequireLoader(source) {
  const result = typeof source === 'string'
    ? nodeEval(source)
    : source;

  if (!('bemfs' in result)) {
    throw new Error('Wrong argument supplied');
  }

  const targets = [];

  const self = this;
  result.bemfs = result.bemfs.forEach((fileName) => {
    const modulePath = path.resolve(fileName);
    const request = loaderUtils.stringifyRequest(self, modulePath);
    targets.push('require(' + request + ')');
  });

  return targets.join(',\n');
}

module.exports = bemRequireLoader;
