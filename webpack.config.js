const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const env = process.env.NODE_ENV;
const isDev = env === 'development';

module.exports = {
  mode: env,
  devtool: isDev ? 'inline-source-map' : 'source-map',
  target: 'web',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: isDev ? 'bundle.js' : 'bundle.[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve(path.join(__dirname, './node_modules/react')),
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
        // Bundle all imported '.scss' files
        test: /\.css$/,
        use: [
          {
            // Create style nodes from JS strings
            loader: 'style-loader',
          },
          {
            // Translate CSS into CommonJS
            loader: 'css-loader',
          },
        ],
      },
      {
        // Bundle fonts referenced in CSS files
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        // Bundle svgs referenced in CSS files
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
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
