import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { parse } from 'path'
import { move } from 'co-fs-extra'
import createSlug from 'slug'
import uuid from 'uuid'

import config from 'config'

import {
  Gallery,
  GalleryImage,
} from '../db'

import {
  getImageUrl,
  renameImage,
  removeImage,
  removeFolder,
  uploadImage,
} from '../utils/image'

function parseJSONLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach(field => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
}

const resolveFunctions = {
  UploadedFile: {
    __parseLiteral: parseJSONLiteral,
    __serialize: value => value,
    __parseValue: value => value,
  },
  RootQuery: {
    galleries(root, args, context) {
      return Gallery.getAll()
    },
    gallery(root, { slug }, context) {
      return Gallery.getBySlug(slug)
    }
  },
  RootMutation: {
    async createGallery(root, { name, description }, context) {
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
      // read gallery
      const gallery = Gallery.getById(id)
      if (!gallery) throw new Error('Invalid gallery!')
      // build new data
      const data = Object.assign({}, gallery, { name, description })
      // name has changed, rename the folder
      if (name !== gallery.name) {
        const slug = Gallery.generateSlug(name)
        const from = `${config.upload.path}/gallery/${gallery.slug}`
        const to = `${config.upload.path}/gallery/${slug}`
        await move(from, to)
        Object.assign(data, { slug })
      }
      // update gallery
      return Gallery.update(data)
    },
    async deleteGallery(root, { id }, context) {
      console.log('******************************************');
      console.log('************* deleteGallery', id);
      console.log('******************************************');
      // read gallery
      const gallery = Gallery.getById(id)
      if (!gallery) throw new Error('Invalid gallery!')
      // remove gallery images
      const images = GalleryImage.getAllByGalleryId(gallery.id)
      for (let index in images) {
        const image = images[index]
        // remove image from fs
        await removeImage('gallery', gallery, image)
        // remove image from db
        GalleryImage.delete(image.id)
      }
      // remove folder
      await removeFolder('gallery', gallery)
      // remove gallery from db
      Gallery.delete(id)
      // return id of deleted gallery
      return id
    },
    async uploadGalleryImages(root, data, context) {
      console.log('******************************************');
      console.log('************* uploadGalleryImages', data);
      console.log('******************************************');
      const { id, files } = data
      const type = 'gallery'

      // load gallery
      const gallery = Gallery.getById(id)
      if (!gallery) {
        throw new Error(`Cannot find gallery #${id}!`)
      }

      // process uploaded files
      const images = []
      for (let i = 0, len = files.length; i < len; i++) {
        console.log(`==> upload file ${i+1} of ${len}`)
        const file = files[i]

        // upload image
        const path = await uploadImage(type, gallery, file)

        // parse uploaded path
        const info = parse(path)

        // build image data
        const data = {
          id: uuid(),
          gallery_id: gallery.id,
          slug: createSlug(info.name),
          filename: info.base,
          extension: info.ext.substring(1),
          name: info.base,
          description: '',
        }

        // create image
        const image = GalleryImage.create(data)

        // add to result
        images.push(image)
      }
      
      console.log('==> upload done');
      return gallery
    },
    async updateImage(root, { id, name, description }, context) {
      console.log('******************************************');
      console.log('************* updateImage', id, name, description);
      console.log('******************************************');
      // validate
      if (!id) throw new Error('ID is required!')
      if (!name) throw new Error('Name is required!')
      if (!description) throw new Error('Description is required!')
      // read image
      const image = GalleryImage.getById(id)
      if (!image) throw new Error('Invalid image!')
      // read gallery
      const gallery = Gallery.getById(image.gallery_id)
      if (!gallery) throw new Error('Invalid gallery!')
      // build new data
      const data = Object.assign({}, image, { name, description })
      // name has changed, rename image file
      if (name !== image.name) {
        const path = await renameImage('gallery', gallery, image, name)
        const info = parse(path)
        Object.assign(data, { slug: info.name, filename: info.base })
      }
      // update
      return GalleryImage.update(data)
    },
    async deleteImage(root, { id }, context) {
      console.log('******************************************');
      console.log('************* deleteImage', id);
      console.log('******************************************');
      // read image
      const image = GalleryImage.getById(id)
      if (!image) throw new Error('Invalid image!')
      // read gallery
      const gallery = Gallery.getById(image.gallery_id)
      if (!gallery) throw new Error('Invalid gallery!')
      // remove image from fs
      await removeImage('gallery', gallery, image)
      // remove image from db
      GalleryImage.delete(id)
      // return id of deleted image
      return id
    },
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
      return getImageUrl('gallery', image.gallery, image)
    },
    small(image) {
      return getImageUrl('gallery', image.gallery, image, 'small')
    },
    medium(image) {
      return getImageUrl('gallery', image.gallery, image, 'medium')
    },
    large(image) {
      return getImageUrl('gallery', image.gallery, image, 'large')
    },
    full(image) {
      return getImageUrl('gallery', image.gallery, image, 'full')
    },
  },
}

export default resolveFunctions
