import React, { Component, PropTypes } from 'react'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import { ApolloProvider } from 'react-apollo'

import client from 'apollo/client'
import App from 'components/App'

export default class Root extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Match pattern={'*'} component={App}/>
        </Router>
      </ApolloProvider>
    )
  }

}
