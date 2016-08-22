import async from 'asyncawait/async'
import await from 'asyncawait/await'
import cloudinary from 'cloudinary'

import config from 'config'

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
})

function readAlbums() {
  return new Promise((resolve, reject) => {
    cloudinary.api.root_folders(result => {
      resolve(result.folders)
    })
  })
}

function readImages(album) {
  return new Promise((resolve, reject) => {
    cloudinary.api.resources(result => {
      resolve(result.resources)
    },{
      type: 'upload',
      prefix: album.path,
    })
  })
}

const resolveFunctions = {
  RootQuery: {
    albums(root, args, context, options){
      return readAlbums()
    },
  },
  Album: {
    id(album) {
      return album.path
    },
    name(album) {
      return album.name
    },
    images(album) {
      return readImages(album)
    }
  },
  Image: {
    id(image) {
      return image.public_id
    }
  },
}

export default resolveFunctions
