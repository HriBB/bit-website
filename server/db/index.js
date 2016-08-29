import low from 'lowdb'
import storage from 'lowdb/lib/file-async'
import createSlug from 'slug'

const db = low('db.json', { storage })
db.defaults({ galleries: [] }).value()
db.defaults({ gallery_images: [] }).value()

export const GalleryImage = {

  getAllByGalleryId: (id) => {
    return db.get('gallery_images')
      .filter(i => i.gallery_id === id)
      .value()
  },

  getById: (id) => {
    return db.get('gallery_images')
      .find({ id })
      .value()
  },

  create: (image) => {
    return db.get('gallery_images')
      .push(image)
      .last()
      .value()
  },

}

export const Gallery = {

  getAll: () => {
    return db.get('galleries')
      .value()
  },

  getById: (id) => {
    return db.get('galleries')
      .find({ id })
      .value()
  },

  getBySlug: (slug) => {
    return db.get('galleries')
      .find({ slug })
      .value()
  },

  generateSlug: (name) => {
    let slug = createSlug(name.toLowerCase())
    let exists
    let number = 2
    let original = slug
    while (exists = this.getBySlug(slug)) {
      slug = `${original}-${number}`
      number++
    }
    return slug
  },

  create: (gallery) => {
    return db.get('galleries')
      .push(gallery)
      .last()
      .value()
  },

  delete: (id) => {
    return db.get('galleries')
      .remove({ id })
      .value()
  },

}
