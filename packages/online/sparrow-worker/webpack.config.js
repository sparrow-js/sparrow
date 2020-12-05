/**
 * Webpack configuration
 *
 * @author Codex Team
 * @copyright Khaydarov Murod
 */
'use strict';

module.exports = (env, argv) => {
  const path = require('path');
  const TerserPlugin = require('terser-webpack-plugin');
  const pkg = require('./package.json');

  /**
   * Environment
   *
   * @type {any}
   */
  const NODE_ENV = argv.mode || 'development';
  const VERSION = process.env.VERSION || pkg.version;

  /**
   * Plugins for bundle
   *
   * @type {webpack}
   */
  const webpack = require('webpack');

  return {
    entry: {
      sparrow_worker: ['@babel/polyfill/noConflict', './src/index.ts'],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: [ 'SparrowWorker' ],
      libraryTarget: 'umd',
    },

    watchOptions: {
      aggregateTimeout: 50,
    },

    /**
     * Tell webpack what directories should be searched when resolving modules.
     */
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.ts'],
    },

    plugins: [
      /** Pass variables into modules */
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        VERSION: JSON.stringify(VERSION),
      }),
    ],

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'postcss-loader',
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'raw-loader',
            },
          ],
        },
      ],
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : false,

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
        }),
      ],
    },
  };
};
