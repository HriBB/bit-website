import { async, await } from 'asyncawait'
import { parse } from 'path'
import { move, removeSync, existsSync } from 'co-fs-extra'
import createSlug from 'slug'
import gm from 'gm'

import config from 'config'

// public functions

/**
 * Get image url
 *
 * @param  {String} type    Image type
 * @param  {Object} parent  Parent object
 * @param  {Object} image   Image object
 * @param  {String} size    Size string
 * @return {String}
 */
export function getImageUrl(type, parent, image, size) {
  if (!size) {
    return `${config.upload.url}/${type}/${parent.slug}/${image.filename}`
  } else {
    return `${config.upload.url}/${type}/${parent.slug}/${image.slug}-${size}.${image.extension}`
  }
}

/**
 * Remove folder
 * @param  {String}  type   Image type
 * @param  {Object}  parent Parent object
 * @return {Promise}
 */
export async function removeFolder(type, parent) {
  console.log('==> removeFolder', `${config.upload.path}/${type}/${parent.slug}`);
  return removeSync(`${config.upload.path}/${type}/${parent.slug}`)
}

/**
 * Upload Gallery Image description
 * @param  {String}  type    Image type
 * @param  {Object}  parent  Parent object
 * @param  {Object}  file    Uploaded file
 * @return {Promise}
 */
export async function uploadImage(type, parent, file) {
  // validate file
  if (!file.path || !file.filename || !file.mime) {
    throw new Error('Invalid file parameters!')
  }
  if (config.image.allowedMimeTypes.indexOf(file.mime) === -1) {
    throw new Error('Invalid image type!')
  }

  // generate unique path
  const finfo = parse(file.filename)
  const filename = (`${createSlug(finfo.name)}${finfo.ext}`).toLowerCase()
  const base = `${config.upload.path}/${type}/${parent.slug}`
  const path = await generateUniquePath(`${base}/${filename}`)

  console.log('==> upload image', path)

  // move original to path
  await move(file.path, path)

  // create size images
  const info = parse(path)
  for (let size in config.image.sizes) {
    let { width, height, crop, quality } = config.image.sizes[size]
    let destination = `${base}/${info.name}-${size}${info.ext}`
    console.log('==> create', size, destination);
    if (crop) {
      await cropImage(path, destination, width, height, quality)
    } else {
      await resizeImage(path, destination, width, height, quality)
    }
  }

  // return path
  return path
}

/**
 * Rename image
 * @param  {String} type   Image type
 * @param  {Object} parent Parent object
 * @param  {Object} image  Image object
 * @param  {String} name   New name
 * @return {Promise}
 */
export async function renameImage(type, parent, image, name) {
  console.log('==> rename image', type, parent.slug, image.name, name)

  const filename = (`${createSlug(name)}.${image.extension}`).toLowerCase()
  const base = `${config.upload.path}/${type}/${parent.slug}`
  const from = `${base}/${image.filename}`
  const to = await generateUniquePath(`${base}/${filename}`)
  const info = parse(to)

  console.log('==> move', from, to)

  // move original to path
  await move(from, to)

  // move sizes
  for (let size in config.image.sizes) {
    console.log('==> move size ',
      `${base}/${image.slug}-${size}.${image.extension}`,
      `${base}/${info.name}-${size}.${image.extension}`
    )
    await move(
      `${base}/${image.slug}-${size}.${image.extension}`,
      `${base}/${info.name}-${size}.${image.extension}`
    )
  }

  console.log('==> renamed image', to)

  // return new path
  return to
}

/**
 * Remove image
 *
 * Remove original and all size images
 *
 * @param  {String} image
 */
export async function removeImage(type, parent, image) {
  console.log('==> remove image', type, parent.slug, image.filename)
  const base = `${config.upload.path}/${type}/${parent.slug}`
  const path = `${base}/${image.filename}`
  const info = parse(path)
  await removeSync(path)
  for (let size in config.image.sizes) {
    await removeSync(`${base}/${info.name}-${size}${info.ext}`)
  }
}

// private functions

/**
 * Get file path
 *
 * Generates unique file path for given destination.
 * If file with the same name already exists in destination,
 * it will add suffix filename-2, filename-3, and so on ...
 *
 * @param  {String} destination Destination folder
 * @param  {String} filename    File name without extension
 * @param  {String} extension   File extension
 * @return {String}
 */
async function generateUniquePath(path) {
  const info = parse(path)
  let number = 2
  let exists
  while (exists = await existsSync(path)) {
    path = `${info.dir}/${info.name}-${number}${info.ext}`
    number++
  }
  return path
}

/**
 * Crop image
 *
 * @param  {String} source
 * @param  {String} destination
 * @param  {Number} width
 * @param  {Number} height
 * @param  {Number} quality
 * @return {Promise}
 */
function cropImage(source, destination, width, height, quality) {
  console.log('==> crop start', source)
  return new Promise((resolve, reject) => {
    gm(source)
    .autoOrient()
    .resize(width, height, '^>')
    .crop(width, height)
    .quality(quality)
    .write(destination, error => {
      if (error) {
        console.log('==> crop error', error)
        reject(error)
      } else {
        console.log('==> crop success', destination)
        resolve()
      }
    })
  })
}

/**
 * Resize image
 *
 * @param  {String} source
 * @param  {String} destination
 * @param  {Number} width
 * @param  {Number} height
 * @param  {Number} quality
 * @return {Promise}
 */
function resizeImage(source, destination, width, height, quality) {
  console.log('==> resize start', source)
  return new Promise((resolve, reject) => {
    gm(source)
    .autoOrient()
    .resize(width, height, '>')
    .quality(quality)
    .write(destination, error => {
      if (error) {
        console.log('==> resize error', error)
        reject(error)
      } else {
        console.log('==> resize success', destination)
        resolve()
      }
    })
  })
}
