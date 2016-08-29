import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { existsSync } from 'co-fs-extra'

import config from 'config'

/**
 * Check uploaded file parameters
 *
 * @param  {Object} file Uploaded file
 * @return {Boolean}
 */
export function checkFileParams(file) {
  return Boolean(file.path && file.filename && file.mime)
}

/**
 * Check uploaded file mimetype
 *
 * @param  {Object} file Uploaded file
 * @return {Boolean}
 */
export function checkFileMimeType(file) {
  return Boolean(config.image.allowedMimeTypes.indexOf(file.mime) > -1)
}

/**
 * Get file path
 *
 * Example
 * /full/path/to/file.jpg => /full/path/to
 * /some/other/longer/path/to/file.jpg => /some/other/longer/path/to
 *
 * @param  {String} path
 * @return {String}
 */
export function getFilePath(file) {
  return file.substr(0, file.lastIndexOf('/'))
}

/**
 * Get file without path
 *
 * Example
 * /full/path/to/file.jpg => file.jpg
 * /some/other/longer/path/to/file.jpg => file.jpg
 *
 * @param  {String} path
 * @return {String}
 */
export function getFileWithoutPath(file) {
  return file.substr(file.lastIndexOf('/') + 1)
}

/**
 * Get filename without extension and with spaces replaced by -
 *
 * Example
 * some-image.JPG => some-image
 * some_image.jpeg => some_image
 * some image.png => some-image
 *
 * @param  {String} filename
 * @return {String}
 */
export function getFileFilename(filename) {
  return filename.substr(0, filename.lastIndexOf('.')).replace(/\s/g, '-').toLowerCase()
}

/**
 * Get extension from file name
 *
 * Return lowercase extension and also replaces 'jpeg' with 'jpg'
 *
 * Example
 * some-image.JPG => jpg
 * some_image.jpeg => jpg
 * some image.png => png
 *
 * @param  {String} filename File name with extension
 * @return {String}
 */
export function getFileExtension(filename) {
  return filename.substr(filename.lastIndexOf('.') + 1).toLowerCase().replace('jpeg', 'jpg')
}

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
export async function getFileUploadPath(destination, filename, extension) {
  let path = `${destination}/${filename}.${extension}`
  let original = filename
  let exists
  let number = 2
  while (exists = await existsSync(path)) {
    filename = `${original}-${number}`
    path = `${destination}/${filename}.${extension}`
    number++
  }
  return path
}
