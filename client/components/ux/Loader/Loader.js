import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Loader.scss'

const Loader = props => {
  return (
    <div className={'bit-loader'}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
