import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import config from 'config'

const networkInterface = createNetworkInterface(`http://localhost:4000/graphql`)

const dataIdFromObject = result => {
  if (result.id && result.__typename) {
    return result.__typename + result.id
  }
  console.log('==> missing dataIdFromObject', result)
  return null
}

export default new ApolloClient({
  networkInterface,
  queryTransformer: addTypename,
  dataIdFromObject,
  shouldBatch: true,
})
