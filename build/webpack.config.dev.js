const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackNotifierPlugin = require('webpack-notifier')

const app_folder = resolve(__dirname, '..', 'app')
const dist_folder = resolve(__dirname, '..', 'dist')

module.exports = {
  entry: [
    'whatwg-fetch',

    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3001',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ],
  output: {
    // the output bundle
    filename: 'bundle.js',

    path: dist_folder,

    // necessary for HMR to know where to load the hot update chunks
    publicPath: 'http://localhost:3001/'
  },

  resolve: {
    alias: {
      actions: resolve(app_folder, 'actions'),
      components: resolve(app_folder, 'components'),
      containers: resolve(app_folder, 'containers'),
      reducers: resolve(app_folder, 'reducer'),
      styles: resolve(app_folder, 'styles'),
      store: resolve(app_folder, 'store'),
      utils: resolve(app_folder, 'utils'),
    }
  },

  context: app_folder,

  devtool: 'inline-source-map',

  devServer: {

    port: 3001,

    // enable HMR on the server
    hot: true,

    // match the output path
    contentBase: dist_folder,

    // match the output `publicPath`
    publicPath: 'http://localhost:3001/',

    historyApiFallback: true

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },

      { test: /\.(png|gif|jpg)$/, loader: 'url-loader', options: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      // load these fonts normally, as files:
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },

    ],
  },

  plugins: [

    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery', // this doesn't expose jQuery property for window, but replaces calls to it in every module
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),

    new HtmlWebpackPlugin({
      template: resolve(app_folder, 'index.html'),
      inject: 'body',
    }),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new ExtractTextPlugin("styles.css"),

    new WebpackNotifierPlugin(),
  ],
}