const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const isDev = env === 'development';

module.exports = {
  mode: env,
  devtool: isDev && 'inline-source-map',
  target: 'web',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: isDev ? 'index.js' : 'index.[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve(path.join(__dirname, './node_modules/react')),
      '../../theme.config$': path.join(__dirname, 'theme/theme.config'),
    },
  },
  module: {
    rules: [
      {
        // All TS files will be handled by awesome-typescript-loader
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        // Bundle all imported '.less' files
        test: /\.less$/,
        use: [
          {
            // Create style nodes from JS strings
            loader: 'style-loader',
          },
          MiniCssExtractPlugin.loader,
          {
            // Translate CSS into CommonJS
            loader: 'css-loader',
          },
          {
            // Keep only woff2 fonts
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      // Bundle fonts referenced in CSS files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader?limit=100000&name=fonts/[name].[ext]',
      },
      // Bundle images referenced in CSS files
      {
        test: /\.(png)$/,
        loader: 'file-loader?limit=100000&name=images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? 'index.css' : 'index.[contenthash].css',
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    !isDev && new webpack.optimize.AggressiveMergingPlugin(),
    isDev && new webpack.HotModuleReplacementPlugin(),
    !isDev &&
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7,
      }),
    !isDev &&
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7,
      }),
  ].filter(Boolean),
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    publicPath: '/',
    public: 'shortnr.local',
    compress: true,
    https: true,
    hotOnly: true,
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  optimization: {
    minimizer: [
      !isDev &&
        new TerserPlugin({
          terserOptions: {
            compress: {
              inline: false,
            },
            output: {
              comments: false,
            },
          },
          sourceMap: true,
        }),
    ].filter(Boolean),
  },
};
