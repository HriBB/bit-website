import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import client from 'apollo/client'
import App from 'components/App'

const Root = (props) => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default Root
