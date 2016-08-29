const typeDefinitions = `

type Gallery {
  id: String!
  slug: String!
  name: String!
  description: String
  images: [Image]
}

type Image {
  id: String!
  slug: String!
  name: String!
  filename: String!
  description: String
  url: String!
}

type RootQuery {
  galleries: [Gallery]
  gallery(slug: String!): Gallery
}

type RootMutation {
  createGallery(name: String!, description: String): Gallery
  updateGallery(id: String!, name: String!, description: String): Gallery
  deleteGallery(id: String!): Int
}

schema {
  query: RootQuery
  mutation: RootMutation
}

`

export default [typeDefinitions]
