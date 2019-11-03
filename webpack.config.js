const path = require('path');
require('@babel/register');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: ['core-js/stable', 'regenerator-runtime', path.join(__dirname, '/src/app/index.js')],
  output: {
    path: path.resolve('./docs'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/pages/index.html'),
      inject: 'body',
      hash: true
    })
  ],
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')]
  },
  devServer: {
    contentBase: [path.resolve('./pages'), path.resolve('./public')],
    compress: true,
    port: 9000,
    // open: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false
    }
  },
  devtool: 'source-map'
};

module.exports = config;
