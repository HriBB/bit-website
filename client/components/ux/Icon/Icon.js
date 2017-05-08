import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Icon.scss'

const Icon = props => {
  const { className, name, ...rest } = props
  const iconClass = classnames('bit-icon', `icon-${name}`, className)
  return (
    <i className={iconClass} {...rest}/>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default Icon
