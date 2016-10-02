import React, { Component, PropTypes } from 'react'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import { ApolloProvider } from 'react-apollo'

import client from 'apollo/client'
//import routes from 'routes'

import App from 'components/App'
import Home from 'components/Home'
import Shop from 'components/Shop'
import About from 'components/About'
import Gallery from 'components/Gallery'
import NotFound from 'components/NotFound'

export default class Root extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <App>
            <Match exactly pattern={'/'} component={Home} />
            <Match pattern={'/about'} component={About} />
            <Match pattern={'/gallery'} component={Gallery} />
            <Match pattern={'/shop'} component={Shop} />
            <Miss component={NotFound} />
          </App>
        </Router>
      </ApolloProvider>
    )
  }

}
