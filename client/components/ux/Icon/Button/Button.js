import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Button.scss'

const Button = props => {
  const { className, name, ...rest } = props
  const buttonClass = classnames('bit-icon-button', className)
  const iconClass = classnames(`icon-${name}`)
  return (
    <button className={buttonClass} {...rest}>
      <i className={iconClass}/>
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default Button
