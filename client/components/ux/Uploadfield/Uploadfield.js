import React, { Component, PropTypes } from 'react'

import './Uploadfield.scss'

const Uploadfield = props => {
  return (
    <input className={'bit-uploadfield'} {...props} type={'file'}/>
  )
}

Uploadfield.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
}

export default Uploadfield
