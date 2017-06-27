const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const runWebpack = require('./helpers/run-webpack');

describe('webpack test config', () => {
  it('should accept css require', () => {
    const paths = getCasePaths('simple-css');

    return runWebpack(paths.source.replace('.bemjson', '')).then((result) => {
      expect(result.toString()).to.contain('background: red;');
    });
  });

  it('should accept scss require', () => {
    const paths = getCasePaths('simple-scss');

    return runWebpack(paths.source.replace('.bemjson', '')).then((result) => {
      expect(result.toString()).to.contain('background: red;');
    });
  });
});


describe('bemrequire-loader', () => {
  it('should pass normal bemjson', () => {
    const paths = getCasePaths('normal-bemjson');

    return runWebpack(paths.source).then((result) => {
      expect(result.toString()).to.contain('display: block');
      expect(result.toString()).to.contain('abc=123');

      const producedHtml = fs.readFileSync(paths.out_produced).toString();
      const expectedHtml = fs.readFileSync(paths.out_expected).toString();
      expect(producedHtml).to.eql(expectedHtml);
    });
  });

  it('should produce readable errors', () => {
    const paths = getCasePaths('error-reqires');

    return runWebpack(paths.source).then(() => {
      expect.fail();
    }).catch((error) => {
      const message = error.toString();
      expect(message).to.contain('_popup/datepicker_popup.scss');
    });
  });
});

/**
 * Generate paths to source and expected files
 *
 * @param {String} caseName
 * @return {{source: *, expected: *}}
 */
function getCasePaths(caseName) {
  return {
    'source': path.join(__dirname, 'cases', caseName,
      'source.bemjson.js'),
    'expected': path.join(__dirname, 'cases', caseName,
      'expected.bemjson.json'),
    'out_produced': path.join(__dirname, 'cases', caseName,
      'source.html'),
    'out_expected': path.join(__dirname, 'cases', caseName,
      'expected.html'),
  };
}
