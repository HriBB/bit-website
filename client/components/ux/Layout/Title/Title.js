import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Title.scss'

const Title = props => {
  const { className, children, flex, ...rest } = props
  const titleClass = classnames('bit-title', {
    'bit-title--flex': flex,
  }, className)
  return (
    <h1 className={titleClass} {...rest}>
      {children}
    </h1>
  )
}

Title.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  flex: PropTypes.bool,
}

export default Title
