import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { parse } from 'path'
import asyncBusboy from 'async-busboy'
import createSlug from 'slug'
import uuid from 'uuid'

import config from 'config'

import {
  Gallery,
  GalleryImage,
} from '../db'

import {
  uploadImage,
} from './image'

export async function uploadImages(ctx, next) {
  // the body isn't multipart, so busboy can't parse it
  if (!ctx.request.is('multipart/*')) return await next()

  try {
    const { files, fields } = await asyncBusboy(ctx.req)
    const { id, type } = fields

    // validate data
    if (!id) {
      throw new Error('Missing upload ID!')
    }
    if (!type) {
      throw new Error('Missing upload type!')
    }
    if (['gallery', 'shop'].indexOf(type) === -1) {
      throw new Error(`Invalid upload type ${type}!`)
    }

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

    // return images
    return ctx.body = { images }

  } catch (error) {

    // catch exceptions
    return ctx.body = { error: error.stack }
  }
}
