import async from 'asyncawait/async'
import await from 'asyncawait/await'
import low from 'lowdb'
import storage from 'lowdb/lib/file-async'
import uuid from 'uuid'
import createSlug from 'slug'

const db = low('db.json', { storage })
db.defaults({ galleries: [] }).value()

function getGalleries() {
  return db.get('galleries')
    .value()
}

function getGalleryBySlug(slug) {
  return db.get('galleries')
    .find({ slug })
    .value()
}

function generateGallerySlug(name) {
  let slug = createSlug(name.toLowerCase())
  let exists
  let number = 2
  let original = slug
  while (exists = getGalleryBySlug(slug)) {
    slug = `${original}-${number}`
    number++
  }
  return slug
}

function createGallery(gallery) {
  return db.get('galleries')
    .push(gallery)
    .last()
    .value()
}

function deleteAlbum(id) {
  return db.get('galleries')
    .remove({ id })
    .value()
}


const resolveFunctions = {
  RootQuery: {
    galleries(root, args, context) {
      return getGalleries()
    },
    gallery(root, { slug }, context) {
      return getGalleryBySlug(slug)
    }
  },
  RootMutation: {
    createGallery(root, { name, description }, context) {
      console.log('******************************************');
      console.log('************* createGallery ****************');
      console.log('******************************************');
      // validate
      if (!name) throw new Error('Name is required!')
      if (!description) throw new Error('Description is required!')
      // generate unique id
      const id = uuid()
      // generate unique slug
      const slug = generateGallerySlug(name)
      // insert into db
      return createGallery({ id, slug, name, description })
    },
    updateGallery(root, { id, name, description }, context) {
      throw new Error('Not Implemented!')
    },
    deleteGallery(root, { id }, context) {
      const gallery = deleteGallery(id)
      console.log('delete', gallery);
      return id
    }
  },
  Gallery: {
    images(gallery) {
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
