import React, { Component, PropTypes } from 'react'

import './Textarea.scss'

const Textarea = props => {
  return (
    <textarea className={'bit-textarea'} {...props}/>
  )
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Textarea
