import React, { Component, PropTypes } from 'react'
import { Router, Route, browserHistory } from 'react-router'

import routes from 'routes'

export default class Root extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={Home}/>
          <Route path="about" component={About}/>
          <Route path="*" component={About}/>
        </Route>
      </Router>
    )
  }

}
