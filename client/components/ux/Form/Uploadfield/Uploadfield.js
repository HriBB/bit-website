import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Uploadfield.scss'

const Uploadfield = props => {
  const { className, ...rest } = props
  return (
    <input
      className={classnames('bit-uploadfield', className)}
      {...rest}
      type={'file'}
    />
  )
}

Uploadfield.propTypes = {
  className: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
}

export default Uploadfield
