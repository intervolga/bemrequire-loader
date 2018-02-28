const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const generateConfig = require('./generate-config');

module.exports = (entry, cb) => {
  const config = generateConfig(entry);
  const compiler = webpack(config);

  const watching = compiler.watch({
    /* watchOptions */
  }, (err, stats) => {
    const we = err ||
      (stats.hasErrors() && stats.compilation.errors[0]) ||
      (stats.hasWarnings() && stats.compilation.warnings[0]);

    if (we) {
      cb(we);
      watching.close();

      return;
    }

    try {
      let bundlePath = path.join(config.output.path, config.output.filename);
      const result = fs.readFileSync(bundlePath);

      cb(result);
    } catch (e) {
      cb(e);
      watching.close();
    }
  });

  return watching;
};
