const path = require('path');
const pkg = require('./package.json');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const babel = {
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: pkg.browserslist,
          useBuiltIns: 'entry',
          corejs: pkg.dependencies['core-js'],
        },
      ],
    ],
  },
};

module.exports = {
  entry: {
    app: './js_src/index.ts',
  },
  output: {
    filename: 'upsetjs.js',
    path: path.resolve(__dirname, 'inst', 'htmlwidgets'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          babel,
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      },
      {
        test: /\.js?$/,
        use: [babel],
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: { '@': path.resolve(__dirname) },
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
