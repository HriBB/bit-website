import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Footer.scss'

const Footer = props => {
  const { centered, className, children, dark, light, primary, secondary, third, ...rest } = props
  const footerClass = classnames('bit-footer', {
    'bit-footer--centered': centered,
    'bit-footer--dark': dark,
    'bit-footer--light': light,
  }, className)
  return (
    <div className={footerClass} {...rest}>
      {children}
    </div>
  )
}

Footer.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  light: PropTypes.bool,
}

export default Footer
