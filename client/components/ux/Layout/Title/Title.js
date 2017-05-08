import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Title.scss'

const Title = props => {
  const { centered, className, children, flex, ...rest } = props
  const titleClass = classnames('bit-title', {
    'bit-title--centered': centered,
    'bit-title--flex': flex,
  }, className)
  return (
    <h1 className={titleClass} {...rest}>
      {children}
    </h1>
  )
}

Title.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  flex: PropTypes.bool,
}

export default Title
