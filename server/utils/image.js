import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { removeSync } from 'co-fs-extra'
import gm from 'gm'

import config from 'config'

import {
  getFilePath,
  getFileFilename,
  getFileExtension,
  getFileWithoutPath,
} from './file'

/**
 * Create size images
 *
 * @param  {String} image
 */
export async function createSizeImages(image) {
  console.log('==> create size images for', image);
  const path = getFilePath(image)
  const file = getFileWithoutPath(image)
  const filename = getFileFilename(file)
  const extension = getFileExtension(file)
  for (let size in config.image.sizes) {
    let { width, height, crop, quality } = config.image.sizes[size]
    let destination = `${path}/${filename}-${size}.${extension}`
    await createImage(image, destination, width, height, quality, crop)
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
  console.log('==> crop start', source);
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
export function resizeImage(source, destination, width, height, quality) {
  console.log('==> resize start', source);
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

/**
 * Remove image
 *
 * Remove original and all size images
 *
 * @param  {String} image
 */
export async function removeImage(image) {
  console.log('==> removeImage', image);
  const path = getFilePath(image)
  const file = getFileWithoutPath(image)
  const filename = getFileFilename(file)
  const extension = getFileExtension(file)
  await removeSync(image)
  for (let size in config.image.sizes) {
    let size = `${path}/${filename}-${size}.${extension}`
    await removeSync(size)
  }
}
