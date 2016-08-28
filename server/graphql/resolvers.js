import async from 'asyncawait/async'
import await from 'asyncawait/await'
import low from 'lowdb'
import fileAsync from 'lowdb/lib/file-async'

import config from 'config'

const db = low('db.json', {
  storage: fileAsync
})

db.defaults({ albums: [] })
  .value()

/*
const albums = db.get('albums')

console.log('==>', albums);

const album = {
  id: 2,
  name: 'New album 2',
  description: 'Album description 2'
}

console.log('==> album', album);

const newAlbum = albums
  .push(album)
  .last()
  .value()

console.log('==> newAlbum', newAlbum);
*/

const resolveFunctions = {
  RootQuery: {
    albums(root, args, context, options){
      return []
    },
  },
  RootMutation: {
    createAlbum(root, { name, description }, context) {
      console.log('******************************************');
      console.log('************* createAlbum ****************');
      console.log('******************************************');
      throw new Error('Not Implemented!')
    },
    updateAlbum(root, { id, name, description }, context) {
      throw new Error('Not Implemented!')
    },
  },
  Album: {
    id(album) {
      return 123
    },
    name(album) {
      return 'name'
    },
    images(album) {
      return []
    }
  },
  Image: {
    id(image) {
      return 123
    }
  },
}

export default resolveFunctions
