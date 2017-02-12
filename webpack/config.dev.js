const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const autoprefixer = require('autoprefixer')

module.exports = {
  name: 'bit',
  target: 'web',
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?' + config.dev.url,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '..', 'client', 'index'),
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
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
      test: /\.(scss|css)$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
    },{
      test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=100000',
    },{
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      loader: 'imports-loader?define=>false&this=>window',
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.resolve(__dirname, '..'),
        postcss: [
          autoprefixer(),
        ],
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, '..', 'client', 'styles'),
          ],
        },
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
