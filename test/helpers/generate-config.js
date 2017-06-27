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

module.exports = (entry, stringify = null) => {
  let config = {
    entry: entry,

    output: {
      path: path.dirname(entry),
      filename: 'produced.bundle.js',
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [{
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
      }],
    },

    target: 'node',
  };

  let loaderConfig = {
    test: /\.bemjson\.js$/,
    use: [
      {
        loader: bemRequireLoader,
        options: {},
      },
      {
        loader: 'intervolga-bembh-loader',
        options: {},
      },
      {
        loader: 'intervolga-bemfs-loader',
        options: {
          levels: levels,
          techMap: techMap,
        },
      },
      {
        loader: 'intervolga-bemdeps-loader',
        options: {
          levels: levels,
          techMap: techMap,
        },
      },
      {
        loader: 'intervolga-bemjson-loader',
        options: {},
      },
    ],
  };
  if (null !== stringify) {
    loaderConfig.use[1].options = {stringify: stringify};
  }

  config.module.loaders.push(loaderConfig);

  return config;
};
