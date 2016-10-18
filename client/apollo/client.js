import ApolloClient, { addTypename } from 'apollo-client'
import fetch from 'isomorphic-fetch'
import merge from 'lodash.merge'

import config from 'config'

import { createNetworkInterface } from './UploadNetworkInterface'

const networkInterface = createNetworkInterface({
  uri: `http://localhost:4000/graphql`
})

const dataIdFromObject = result => {
  if (result.id && result.__typename) {
    return result.__typename + result.id
  }
  console.log('==> missing __typename in dataIdFromObject', result)
  if (result.id) {
    return result.id
  }
  console.log('==> missing id in dataIdFromObject', result)
  return null
}

export default new ApolloClient({
  networkInterface,
  queryTransformer: addTypename,
  dataIdFromObject,
  //dataIdFromObject: o => `${o.__typename}-${o.id},`
  shouldBatch: true,
})
