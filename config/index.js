var path = require('path')

module.exports = {
  server: {
    url: 'http://localhost:4000',
    host: 'localhost',
    port: 4000,
  },
  dev: {
    url: 'http://localhost:3000',
    host: '0.0.0.0',
    port: 3000,
  },
  static: {
    path: path.resolve(__dirname, '..', 'static'),
  },
  dist: {
    path: path.resolve(__dirname, '..', 'dist'),
  },
}
