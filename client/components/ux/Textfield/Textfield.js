import React, { Component, PropTypes } from 'react'

import './Textfield.scss'

const Textfield = props => {
  return (
    <input className={'bit-textfield'} {...props} type={'text'}/>
  )
}

Textfield.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Textfield
