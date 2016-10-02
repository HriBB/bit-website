import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Paragraph.scss'

const Paragraph = props => {
  const { className, children, ...rest } = props
  const contentClass = classnames('bit-paragraph', className)
  return (
    <div className={contentClass} {...rest}>
      {children}
    </div>
  )
}

Paragraph.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default Paragraph
