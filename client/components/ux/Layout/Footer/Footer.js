import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Footer.scss'

const Footer = props => {
  const { children, className, ...rest } = props
  const footerClass = classnames('bit-footer', className)
  return (
    <div className={footerClass} {...rest}>
      {children}
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default Footer
