import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { move } from 'co-fs-extra'
import uuid from 'uuid'

import config from 'config'

import {
  Gallery,
  GalleryImage,
} from '../db'

import {
  getGalleryImageUrl,
} from '../utils/image'

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
    async updateGallery(root, { id, name, description }, context) {
      console.log('******************************************');
      console.log('************* updateGallery', id, name, description);
      console.log('******************************************');
      // validate
      if (!id) throw new Error('ID is required!')
      if (!name) throw new Error('Name is required!')
      if (!description) throw new Error('Description is required!')
      // read old gallery
      const old = Gallery.getById(id)
      if (!old) throw new Error('Invalid gallery ID!')
      // get slug
      let slug = old.slug
      // name has changed
      if (name !== old.name) {
        slug = Gallery.generateSlug(name)
        const from = `${config.upload.path}/gallery/${old.slug}`
        const to = `${config.upload.path}/gallery/${slug}`
        await move(from, to)
      }
      // update
      return Gallery.update({ id, slug, name, description })
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
      const images = GalleryImage.getAllByGalleryId(gallery.id)
      return images.map(image => Object.assign({}, image, { gallery }))
    },
    image(gallery) {
      const image = GalleryImage.getFirstByGalleryId(gallery.id)
      return image ? Object.assign({}, image, { gallery }) : null
    },
  },
  Image: {
    url(image) {
      return getGalleryImageUrl(image.gallery, image)
    },
    small(image) {
      return getGalleryImageUrl(image.gallery, image, 'small')
    },
    medium(image) {
      return getGalleryImageUrl(image.gallery, image, 'medium')
    },
    large(image) {
      return getGalleryImageUrl(image.gallery, image, 'large')
    },
    full(image) {
      return getGalleryImageUrl(image.gallery, image, 'full')
    },
  },
}

export default resolveFunctions
