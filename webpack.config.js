/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint no-undef: "off" */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = __dirname;

module.exports = function () {
  return {
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(rootPath, 'dist'),
      filename: '[name].js',
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    resolve: {
      extensions: ['.tsx', '.ts'],
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(rootPath, 'babel.config.js'),
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },

    plugins: [new HtmlWebpackPlugin()],
  };
};
