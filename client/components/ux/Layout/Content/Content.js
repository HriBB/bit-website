import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Content.scss'

const Content = props => {
  const { className, children, ...rest } = props
  const contentClass = classnames('bit-content', className)
  return (
    <div className={contentClass} {...rest}>
      {children}
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default Content
