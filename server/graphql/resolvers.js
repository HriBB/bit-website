import async from 'asyncawait/async'
import await from 'asyncawait/await'
import uuid from 'uuid'

import {
  Gallery,
  GalleryImage,
} from '../db'

const resolveFunctions = {
  RootQuery: {
    galleries(root, args, context) {
      return Gallery.getAll()
    },
    gallery(root, { slug }, context) {
      return Gallery.getBySlug(slug)
    }
  },
  RootMutation: {
    createGallery(root, { name, description }, context) {
      console.log('******************************************');
      console.log('************* createGallery', name, description);
      console.log('******************************************');
      // validate
      if (!name) throw new Error('Name is required!')
      if (!description) throw new Error('Description is required!')
      // generate unique id
      const id = uuid()
      // generate unique slug
      const slug = Gallery.generateSlug(name)
      // insert into db
      return Gallery.create({ id, slug, name, description })
    },
    updateGallery(root, { id, name, description }, context) {
      console.log('******************************************');
      console.log('************* updateGallery', id, name, description);
      console.log('******************************************');
      throw new Error('Not Implemented!')
    },
    deleteGallery(root, { id }, context) {
      console.log('******************************************');
      console.log('************* deleteGallery', id);
      console.log('******************************************');
      const gallery = Gallery.delete(id)
      console.log('delete', gallery);
      return id
    }
  },
  Gallery: {
    images(gallery) {
      return GalleryImage.getAllByGalleryId(gallery.id)
    }
  },
  Image: {
  },
}

export default resolveFunctions
