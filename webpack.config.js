/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint no-undef: "off" */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const { v4: uuid4 } = require('uuid');

const rootPath = __dirname;

const styleNonce = `nonce-${uuid4()}`;

module.exports = function (env, argv) {
  return [
    {
      entry: './src/electron.tsx',
      output: {
        path: path.resolve(rootPath, 'dist'),
        filename: 'electron.js',
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
      target: 'electron-main',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'ts-loader',
              },
            ],
          },
        ],
      },
    },
    {
      devtool: 'inline-source-map',
      entry: './src/index.tsx',
      output: {
        path: path.resolve(rootPath, 'dist'),
        filename: '[name].js',
      },

      resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },

      target: 'electron-renderer',

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
                loader: 'ts-loader',
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              argv.mode === 'development'
                ? {
                    loader: 'style-loader',
                    options: {
                      attributes: { nonce: styleNonce },
                    },
                  }
                : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
          template: './assets/template.html',
          meta: {
            'Content-Security-Policy': `default-src 'self'; script-src 'self'; style-src 'self' '${styleNonce}'; connect-src 'self' http://localhost:8888`,
          },
        }),
        new MiniCssExtractPlugin(),
        new DefinePlugin({
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          STYLE_NONCE: JSON.stringify(styleNonce),
        }),
      ],
    },
  ];
};
