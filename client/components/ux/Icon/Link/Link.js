import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router'
import classnames from 'classnames'

import './Link.scss'

const Link = props => {
  const { className, name, ...rest } = props
  const buttonClass = classnames('bit-icon-link', className)
  const iconClass = classnames(`icon-${name}`)
  return (
    <RouterLink className={buttonClass} {...rest}>
      <i className={iconClass}/>
    </RouterLink>
  )
}

Link.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default Link
