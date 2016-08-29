import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { resolve } from 'path'
import { move, existsSync, readdirSync } from 'co-fs-extra'

import config from '../../config'
import db from '../db'

import {
  getAuthenticatedUser,
} from './user'

import {
  createSizeImages,
} from './image'

import {
  checkFileParams,
  checkFileMimeType,
  getFileUploadPath,
  getFileFilename,
  getFileExtension
} from './file'

/**
 * Get salon upload directory helper
 *
 * @param  {String} slug
 * @return {String}
 */
export function getSalonUploadDir(slug) {
  return `/documents/salon/${slug}`
}

/**
 * Get salon upload path helper
 *
 * @param  {String} slug
 * @return {String}
 */
export function getSalonUploadPath(slug) {
  return `${config.upload.path}/salon/${slug}`
}

/**
 * Get salon picture url helper
 *
 * @param  {Object} salon
 * @param  {Object} picture
 * @param  {String} size
 * @return {String}
 */
export function getSalonPictureUrl(salon, picture, size) {
  const dir = getSalonPictureDir(salon, picture, size)
  return `${config.server.url}${dir}`
}

/**
 * Get salon picture directory helper
 *
 * @param  {Object} salon
 * @param  {Object} picture
 * @param  {String} size
 * @return {String}
 */
export function getSalonPictureDir(salon, picture, size) {
  const salonUrl = getSalonUploadDir(salon.slug)
  if (!size) {
    return `${salonUrl}/${picture.type}/${picture.filename}`
  }
  if (!config.picture.sizes[size]) {
    throw new Error(`Invalid picture size "${size}"!`)
  }
  const file = picture.filename
  const lastIndex = file.lastIndexOf('.')
  const filename = file.substr(0, lastIndex)
  const extension = file.substr(lastIndex + 1).toLowerCase()
  return `${salonUrl}/${picture.type}/${filename}-${size}.${extension}`
}

/**
 * Get salon resource picture url
 *
 * @param  {Object} salon
 * @param  {Object} resource
 * @param  {String} size
 * @return {String}
 */
export function getSalonResourcePictureUrl(salon, resource, size) {
  const dir = getSalonResourcePictureDir(salon, resource, size)
  return `${config.server.url}${dir}`
}

/**
 * Get salon resource picture url
 *
 * @param  {Object} salon
 * @param  {Object} resource
 * @param  {String} size
 * @return {String}
 */
export function getSalonResourcePictureDir(salon, resource, size) {
  if (!resource.picture) {
    return null
  }
  const salonUrl = getSalonUploadDir(salon.slug)
  if (!size) {
    return `${salonUrl}/resource/${resource.picture}`
  }
  if (!config.picture.sizes[size]) {
    throw new Error(`Invalid picture size "${size}"!`)
  }
  const file = resource.picture
  const lastIndex = file.lastIndexOf('.')
  const filename = file.substr(0, lastIndex)
  const extension = file.substr(lastIndex + 1).toLowerCase()
  return `${salonUrl}/resource/${filename}-${size}.${extension}`
}

/**
 * Rename salon upload path helper
 *
 * @param  {String} oldSlug
 * @param  {String} newSlug
 * @return {Boolean}
 */
export async function renameSalonUploadPath(oldSlug, newSlug) {
  const oldPath = getSalonUploadPath(oldSlug)
  const newPath = getSalonUploadPath(newSlug)
  console.log('==> oldPath', oldPath)
  console.log('==> newPath', newPath)
  await move(oldPath, newPath)
  return true
}

/**
 * Upload salon pictures
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 * @return {Object|undefined}
 */
export async function uploadSalonPictures(req, res, next) {
  console.log('===========================================')
  console.log('===========================================')
  console.log('==> uploadSalonPictures', req.params)
  console.log('===========================================')
  console.log('===========================================')

  try {

    // check user
    const user = await getAuthenticatedUser(req)
    if (!user) return res.json({ error: 'Must be logged in!' })

    // check type
    const type = req.body.type
    if (!type || ['profile', 'header', 'gallery'].indexOf(type) === -1) {
      return res.json({ error: `Invalid picture type ${type}!` })
    }

    // check salon
    const salon = await db.Salon.findOne({ where: { id: req.params.id } })
    if (!salon) return res.json({ error: 'Invalid salon ID!' })

    // check files
    const files = req.files
    if (!files || !files.length) return res.json({ error: 'No files uploaded!' })

    // picture results
    let pictures = []

    // loop through all files
    for (let i = 0, len = files.length; i < len; i++) {
      const file = files[i]

      // check file parameters
      if (!checkFileParams(file)) {
        return res.json({ error: 'Invalid file parameters!' })
      }

      // check file mimetype
      if (!checkFileMimeType(file)) {
        return res.json({ error: 'Invalid image type!' })
      }

      // destination path
      //let destination = `${config.upload.path}/salon/${salon.slug}/${type}`
      let destination = `${getSalonUploadPath(salon.slug)}/${type}`

      // process file data
      const filename = getFileFilename(file.originalname)
      const extension = getFileExtension(file.originalname)
      const path = await getFileUploadPath(destination, filename, extension)

      // move original to destination
      await move(file.path, path)

      // create size images
      await createSizeImages(path, destination, filename, extension)

      // build picture data
      let data = {
        salon_id: salon.id,
        type: type,
        filename: `${filename}.${extension}`,
        active: true,
        created_on: new Date(),
        created_by: user.id,
      }

      // insert into database
      let salonPicture = await db.SalonPicture.create(data)

      // push to result
      pictures.push(salonPicture)
    }

    // send response based on type
    switch (type) {
      case 'profile':
        return res.json({ profile_picture: pictures[0] })
      case 'header':
        return res.json({ header_picture: pictures[0] })
      case 'gallery':
        return res.json({ gallery_pictures: pictures })
    }

  } catch (error) {
    // TODO: cleanup files
    console.log('==> error', error.message)
    console.log('==> stack', error.stack)
    return res.json({ error: error.message })
  }
}

/**
 * Upload salon resource pictures
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 * @return {Object|undefined}
 */
export async function uploadSalonResourcePictures(req, res, next) {

  console.log('===========================================')
  console.log('===========================================')
  console.log('==> uploadSalonResourcePictures', req.params)
  console.log('===========================================')
  console.log('===========================================')

  try {

    // check user
    const user = await getAuthenticatedUser(req)
    if (!user) return res.json({ error: 'Must be logged in!' })

    // extract request params
    const { salonId, resourceId } = req.params

    // check salon
    const salon = await db.Salon.findOne({ where: { id: salonId } })
    if (!salon) return res.json({ error: 'Salon not found!' })

    // check resource
    const resource = await db.SalonResource.findOne({ where: { id: resourceId } })
    if (!resource) return res.json({ error: 'Resource not found!' })

    // check resource user
    const resourceUser = await resource.getUser()
    if (!resourceUser) return res.json({ error: 'Resource User not found!' })

    // check files
    const files = req.files
    if (!files || !files.length) return res.json({ error: 'No files uploaded!' })

    // only one file is allowed for resource picture
    const file = files[0]

    // check file parameters
    if (!checkFileParams(file)) {
      return res.json({ error: 'Invalid file parameters!' })
    }

    // check file mimetype
    if (!checkFileMimeType(file)) {
      return res.json({ error: 'Invalid image type!' })
    }

    // destination path
    const destination = `${getSalonUploadPath(salon.slug)}/resource`

    // process file data
    const filename = resourceUser.username.toLowerCase()
    const extension = getFileExtension(file.originalname)
    const path = `${destination}/${filename}.${extension}`

    // move original to destination
    const moved = await move(file.path, path, { clobber: true })

    // create size images
    await createSizeImages(path, destination, filename, extension)

    // build data
    const data = {
      picture: `${filename}.${extension}`,
      updated_on: new Date(),
      updated_by: user.id,
    }

    // update resource
    await db.SalonResource.update(data, { where: { id: resourceId } })

    // fetch updated resource
    const updatedResource = await db.SalonResource.findOne({ where: { id: resourceId } })

    // return updated resource
    return res.json({
      resource: updatedResource,
      picture: data.picture,
    })

  } catch (error) {
    // TODO: cleanup uploaded files
    console.log('==> error', error.message)
    console.log('==> stack', error.stack)
    return res.json({ error: error.message })
  }
}

/**
 * Regenerate salon pictures
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 * @return {undefined}
 */
export async function regenerateSalonPictures(req, res, next) {
  // async actions
  let actions = []

  // picture sizes
  const sizes = config.picture.sizes

  // folder root
  const root = `${config.upload.path}/salon`
  console.log('==> regenerateSalonImages', root)

  // skip size images
  const re = Object.keys(sizes).map(size => `-${size}.`).join('|')
  const isSizeFile = new RegExp(re)

  // start building actions
  readdirSync(root).forEach(salon => {
    readdirSync(`${root}/${salon}`).forEach(type => {
      readdirSync(`${root}/${salon}/${type}`)
      .filter(file => !isSizeFile.test(file))
      .forEach(file => {
        const picture = `${root}/${salon}/${type}/${file}`
        const lastIndex = file.lastIndexOf('.')
        const filename = file.substr(0, lastIndex)
        const extension = file.substr(lastIndex + 1).toLowerCase()
        Object.keys(sizes).forEach(size => {
          const destination = `${root}/${salon}/${type}/${filename}-${size}.${extension}`
          const action = Object.assign({
            source: picture,
            destination: destination,
          }, sizes[size])
          actions.push(action)
        })
      })
    })
  })

  // execute actions
  console.log('==> regenerateSalonImages actions', actions.length)
  try {
    for (let index in actions) {
      const { source, width, height, crop, quality, destination } = actions[index]
      await createImage(source, destination, width, height, quality, crop)
    }
    console.log('==> regenerateSalonImages success')
    res.json({ success: true })
  } catch (error) {
    console.log('==> regenerateSalonImages error', error)
    res.json({ error: error })
  }
}
