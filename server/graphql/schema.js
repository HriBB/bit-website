const typeDefinitions = `

type Gallery {
  id: String!
  name: String!
  slug: String!
  description: String
  images: [Image]
}

type Image {
  id: String!
  name: String!
  slug: String!
  description: String
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
