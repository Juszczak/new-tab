const webpack = require('webpack');
const {resolve} = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    main: [
      resolve('./src/main.tsx'),
      resolve('./src/styles.styl'),
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.styl', '.js'],
    modules: [resolve(__dirname, './node_modules')]
  },
  resolveLoader: {
    modules: [resolve(__dirname, './node_modules')]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: `[name].js`,
  },
  module: {
    rules: [{
      test: /\.styl$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'stylus-loader'],
      }),
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'ts-loader',
    }],
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([{
      from: resolve('./src/manifest.json'),
      to: resolve('./dist'),
    }])
  ],
}
module.exports = config
