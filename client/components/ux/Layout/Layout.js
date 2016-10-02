import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Layout.scss'

export default function Layout(props) {
  const { centered, className, children, fullscreen, ...rest } = props
  const layoutClass = classnames('bit-layout', {
    'bit-layout--centered': centered,
    'bit-layout--fullscreen': fullscreen,
  }, className)
  return (
    <div className={layoutClass} {...rest}>
      {children}
    </div>
  )
}

Layout.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  fullscreen: PropTypes.bool,
}
