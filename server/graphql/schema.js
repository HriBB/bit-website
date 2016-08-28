const typeDefinitions = `
type Album {
  id: Int!
  name: String!
  slug: String!
  description: String
  images: [Image]
}

type Image {
  id: Int!
  name: String!
  slug: String!
  description: String
}

type RootQuery {
  albums: [Album]
}

type RootMutation {
  createAlbum(name: String!, description: String): Album
  updateAlbum(id: Int!, name: String!, description: String): Album
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`

export default [typeDefinitions]
