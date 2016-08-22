import React, { Component, PropTypes } from 'react'

import './Home.scss'

export default class Home extends Component {
  render() {
    return (
      <div className={'bit-home'}>
        <img src={require('./logo.png')} alt={'BIT Clothes'}/>
      </div>
    )
  }
}
