import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import './App.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>BIT Clothes</h1>
        {this.props.children}
      </div>
    )
  }
}

/*

export default class App extends Component {

  static propTypes = {
    //device: PropTypes.object,
  }

  render() {
    console.log('render App', this.props);
    const { children } = this.props
    const className = classnames({
      'bit': true,
      'bit--fullscreen': fullscreen,
      'bit--mobile': device.mobile,
    })
    return (
      <div className={className}>
        <h1>BIT Clothes</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <div>
          {children}
        </div>
      </div>
    )
  }
}
*/
