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
    filename: 'bundle.js',
    // the output bundle

    path: dist_folder,

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
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
    publicPath: '/'

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
          fallbackLoader: "style-loader",
          loader: ["css-loader", "less-loader"]
        })
      }

    ],
  },

  plugins: [

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