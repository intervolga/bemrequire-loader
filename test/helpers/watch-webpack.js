const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const generateConfig = require('./generate-config');
const requireNoCache = require('./require-no-cache');

module.exports = (entry, stringify, cb) => {
  const config = generateConfig(entry, stringify);
  const compiler = webpack(config);

  compiler.watch({
    /* watchOptions */
  }, (err, stats) => {
    const we = err ||
      (stats.hasErrors() && stats.compilation.errors[0]) ||
      (stats.hasWarnings() && stats.compilation.warnings[0]);

    if (we) {
      cb(we);
      return;
    }

    try {
      let bundlePath = path.join(config.output.path, config.output.filename);
      const result = fs.readFileSync(bundlePath);

      cb(result);
    } catch (e) {
      cb(e);
    }
  });
};
