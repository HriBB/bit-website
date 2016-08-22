var path = require('path')

module.exports = {
  cloudinary: {
    cloud_name: 'bitclothes',
    api_key: '731624789314795',
    api_secret: 'ne4TIWMYHxeE0WfU1JFxvhvZqa4',
    url: 'cloudinary://731624789314795:ne4TIWMYHxeE0WfU1JFxvhvZqa4@bitclothes',
    base_delivery_url: 'http://res.cloudinary.com/bitclothes',
    secure_delivery_url: 'https://res.cloudinary.com/bitclothes',
    api_base_url: 'https://api.cloudinary.com/v1_1/bitclothes',
  },
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
