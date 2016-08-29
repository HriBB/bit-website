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
  upload: {
    dir: '/image',
    path: path.resolve(__dirname, '..', 'documents'),
    url: 'http://localhost:4000/documents',
  },
  image: {
    allowedMimeTypes: ['image/jpeg', 'image/png'],
    sizes: {
      small:  { width: 360,   height: 360,  crop: false, quality: 90 },
      medium: { width: 768,   height: 768,  crop: false, quality: 90 },
      large:  { width: 1280,  height: 1280, crop: false, quality: 90 },
      full:   { width: 1920,  height: 1920, crop: false, quality: 90 },
    },
  },
}
