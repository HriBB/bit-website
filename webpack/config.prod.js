var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPluginRemove = require('html-webpack-plugin-remove')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')

module.exports = {
  name: 'bit',
  target: 'web',
  entry: [
    path.resolve(__dirname, '..', 'client', 'index'),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bit.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '..', 'client'),
      path.resolve(__dirname, '..', 'config'),
      path.resolve(__dirname, '..', 'node_modules'),
    ],
    extensions: ['.js', '.scss', '.css', '.gql', '.graphql'],
    alias: {
      config: path.resolve(__dirname, '..', 'config'),
      apollo: path.resolve(__dirname, '..', 'client', 'apollo'),
      components: path.resolve(__dirname, '..', 'client', 'components'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      include: [
        path.resolve(__dirname, '..', 'config'),
        path.resolve(__dirname, '..', 'client'),
      ],
      query: {
        cacheDirectory: true,
      },
    },{
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader', 'postcss-loader'],
      })
    },{
      test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=100000',
    },{
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      loader: 'imports?define=>false&this=>window',
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: [
          autoprefixer(),
        ],
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, '..', 'client', 'styles'),
          ],
        },
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new HtmlWebpackPluginRemove('<script src="/bit.js"></script>\n'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'index.html'),
      filename: 'index.html',
      inject: 'body',
      hash: true,
      xhtml: true,
    }),
    new ExtractTextPlugin('bit.css'),
  ],
}
