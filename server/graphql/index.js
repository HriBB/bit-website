import { async, await } from 'asyncawait'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import { get, post } from 'koa-route'

import typeDefs from './schema'
import resolvers from './resolvers'
import graphqlKoaUpload from './graphqlKoaUpload'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve: true,
})

export function createGraphQLServer(app) {
  app.use(graphqlKoaUpload({ endpointURL: '/graphql' }))
  app.use(post('/graphql', graphqlKoa({ schema })))
  app.use(get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' })))
}
