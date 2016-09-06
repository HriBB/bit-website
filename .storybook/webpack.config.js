const path = require('path');


module.exports = {
  module: {
    loaders: [{
      test: /\.(scss|css)$/,
      loader: 'style!css?sourceMap!resolve-url?sourceMap!sass?sourceMap!postcss',
    },{
      test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=100000',
    }]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, '..', 'client', 'styles')],
  },
  postcss: function() {
    return [
      require('autoprefixer'),
    ]
  },
}
