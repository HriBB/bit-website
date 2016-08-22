var path = require('path')

module.exports = {
  db: {
    host: 'localhost',
    database: 'climbuddy',
    user: 'root',
    pass: 'sql123',
    timezone: '+02:00'
  },
  server: {
    url: 'http://localhost:3000',
    host: 'localhost',
    port: 3000
  },
  api: {
    url: 'http://localhost:4000/api',
    host: 'localhost',
    port: 4000
  },
  token: {
    expires: 10080,
    secret: 'eyJ0aXRsZSI6ImZ1Y2sgeW91IHBheSBtZSIsImxlYWQiOiJ0'
  },
  uploads: {
    dir: 'uploads',
    url: 'http://localhost:3000/uploads',
    path: path.resolve(__dirname, '..', 'uploads')
  },
  map: {
    key: 'AIzaSyAEljB0ghuEVUYriBrVKUu0VhWJ5CKWJOw',
    api: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAEljB0ghuEVUYriBrVKUu0VhWJ5CKWJOw'
  }
}
