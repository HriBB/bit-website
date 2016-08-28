import React, { Component, PropTypes } from 'react'

import './Button.scss'

const Button = props => {
  const { children, ...rest } = props
  return (
    <button className={'bit-button'} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Button
