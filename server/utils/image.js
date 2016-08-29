import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { remove, removeSync } from 'co-fs-extra'
import gm from 'gm'

import config from '../../config'

import {
  getFilePath,
  getFileFilename,
  getFileExtension,
  getFileWithoutPath,
} from './file'

/**
 * Remove image
 *
 * Will remove original and all size images
 *
 * @param  {String} image
 */
export async function removeImage(image) {
  const path = getFilePath(image)
  console.log('==> path', path);
  const file = getFileWithoutPath(image)
  console.log('==> file', file);
  const filename = getFileFilename(file)
  console.log('==> filename', filename);
  const extension = getFileExtension(file)
  await removeSync(image)
  for (let size in config.image.sizes) {
    let size = `${path}/${filename}-${size}.${extension}`
    console.log('==> size', size);
    await removeSync(size)
  }
}

/**
 * Create size images
 *
 * @param  {String} source
 * @param  {String} destination
 * @param  {String} filename
 * @param  {String} extension
 */
export async function createSizeImages(source, destination, filename, extension) {
  console.log('==> create size images for', source);
  for (let size in config.image.sizes) {
    let { width, height, crop, quality } = config.image.sizes[size]
    let dest = `${destination}/${filename}-${size}.${extension}`
    await createImage(source, dest, width, height, quality, crop)
  }
}

/**
 * Create image helper
 *
 * Depending on crop parameter either crops or resizes image
 *
 * @param  {String} source
 * @param  {String} destination
 * @param  {Number} width
 * @param  {Number} height
 * @param  {Number} quality
 * @param  {Boolean} crop
 * @return {Promise}
 */
export function createImage(source, destination, width, height, quality, crop) {
  if (crop) {
    return cropImage(source, destination, width, height, quality)
  } else {
    return resizeImage(source, destination, width, height, quality)
  }
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
export function cropImage(source, destination, width, height, quality) {
  console.log('==> crop image start', source);
  return new Promise((resolve, reject) => {
    gm(source)
    .autoOrient()
    .resize(width, height, '^>')
    .crop(width, height)
    .quality(quality)
    .write(destination, error => {
      if (error) {
        console.log('==> crop image error', error)
        reject(error)
      } else {
        console.log('==> crop image success', destination)
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
export function resizeImage(source, destination, width, height, quality) {
  console.log('==> resize image start', source);
  return new Promise((resolve, reject) => {
    gm(source)
    .autoOrient()
    .resize(width, height, '>')
    .quality(quality)
    .write(destination, error => {
      if (error) {
        console.log('==> resize image error', error)
        reject(error)
      } else {
        console.log('==> resize image success', destination)
        resolve()
      }
    })
  })
}
