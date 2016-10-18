const typeDefinitions = `

type Gallery {
  id: String!
  slug: String!
  name: String!
  description: String
  images: [Image]
  image: Image
}

type Image {
  id: String!
  slug: String!
  name: String!
  filename: String!
  extension: String!
  description: String
  url: String!
  small: String!
  medium: String!
  large: String!
  full: String!
}

scalar UploadedFile

type RootQuery {
  galleries: [Gallery]
  gallery(slug: String!): Gallery
}

type RootMutation {
  createGallery(name: String!, description: String): Gallery
  updateGallery(id: String!, name: String!, description: String): Gallery
  deleteGallery(id: String!): String
  uploadGalleryImages(id: String!, files: [UploadedFile!]!): Gallery
  updateImage(id: String!, name: String!, description: String): Image
  deleteImage(id: String!): String
}

schema {
  query: RootQuery
  mutation: RootMutation
}

`

export default [typeDefinitions]
