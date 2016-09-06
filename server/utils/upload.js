import async from 'asyncawait/async'
import await from 'asyncawait/await'
import asyncBusboy from 'async-busboy'
import { move } from 'co-fs-extra'
import createSlug from 'slug'
import uuid from 'uuid'

import config from 'config'

import {
  Gallery,
  GalleryImage,
} from '../db'

import {
  createSizeImages,
} from './image'

import {
  checkFileParams,
  checkFileMimeType,
  getFileFilename,
  getFileExtension,
  getFileWithoutPath,
  getFileUploadPath,
} from './file'

export async function uploadImages(ctx, next) {
  // the body isn't multipart, so busboy can't parse it
  if (!ctx.request.is('multipart/*')) return await next()

  try {

    // parse request with async busboy
    const { files, fields } = await asyncBusboy(ctx.req);

    // extract data
    const { id, type } = fields

    // validate data
    if (!id) {
      return ctx.body = { error: 'Missing upload ID!' }
    }
    if (!type) {
      return ctx.body = { error: 'Missing upload type!' }
    }
    if (['gallery', 'shop'].indexOf(type) === -1) {
      return ctx.body = { error: `Invalid upload type ${type}!` }
    }

    // load gallery
    const gallery = Gallery.getById(id)
    if (!gallery) {
      return ctx.body = { error: `Cannot find gallery #${id}!` }
    }

    // build upload destination
    const destination = `${config.upload.path}/${type}/${gallery.slug}`

    // array of images
    let images = []

    // loop through all files
    for (let i = 0, len = files.length; i < len; i++) {
      let file = files[i]

      // check file parameters
      if (!checkFileParams(file)) {
        return ctx.body = { error: 'Invalid file parameters!' }
      }

      // check file mimetype
      if (!checkFileMimeType(file)) {
        return ctx.body = { error: 'Invalid image type!' }
      }

      // process file data
      let filename = getFileFilename(file.filename)
      let extension = getFileExtension(file.filename)
      let path = await getFileUploadPath(destination, filename, extension)
      let basename = getFileFilename(getFileWithoutPath(path))

      console.log('====> upload image', path);

      // move temp file to path
      await move(file.path, path)

      // create size images
      await createSizeImages(path)

      // build image data
      let imageData = {
        id: uuid(),
        gallery_id: gallery.id,
        slug: createSlug(basename),
        filename: `${basename}.${extension}`,
        extension: extension,
        name: basename,
        description: '',
      }

      // create image
      let image = GalleryImage.create(imageData)

      // add to result
      images.push(image)

      console.log('====> create image', path);
    }

    // return images
    return ctx.body = { images }

  } catch (error) {

    // catch exceptions
    return ctx.body = { error: error.stack }
  }
}
