import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
