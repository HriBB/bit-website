const typeDefinitions = `
type Album {
  id: String!
  name: String!
  images: [Image]
}

type Image {
  id: String!,
  format: String!,
  version: Int!,
  resource_type: String!,
  type: String!,
  created_at: String!,
  bytes: Int!,
  width: Int!,
  height: Int!,
  url: String!,
  secure_url: String!
}

type RootQuery {
  albums: [Album]
}

schema {
  query: RootQuery
}
`

export default [typeDefinitions]
