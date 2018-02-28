const path = require('path');
const bemRequireLoader = path.join(__dirname, '..', '..', 'index.js');

const levels = [
  'test/levels/blocks.base',
  'test/levels/blocks.plugins',
  'test/levels/blocks.common',
  'test/levels/blocks.project',
];

const techMap = {
  styles: ['css', 'scss'],
  scripts: ['js', 'babel.js'],
  html: ['bh.js'],
};

module.exports = (entry) => {
  return {
    mode: 'development',

    entry: entry,

    output: {
      path: path.dirname(entry),
      filename: 'produced.bundle.js',
      libraryTarget: 'commonjs2',
    },

    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      }, {
        test: /\.bemjson\.js$/,
        use: [
          {
            loader: bemRequireLoader,
            options: {},
          },
          {
            loader: '@intervolga/bembh-loader',
            options: {},
          },
          {
            loader: '@intervolga/bemdeps-loader',
            options: {
              levels: levels,
              techMap: techMap,
            },
          },
          {
            loader: '@intervolga/bemdecl-loader',
            options: {
              levels: levels,
            },
          },
          '@intervolga/bemjson-loader',
          '@intervolga/eval-loader',
        ],
      }],
    },

    target: 'node',
  };
};
