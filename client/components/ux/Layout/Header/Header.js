import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Header.scss'

const Header = props => {
  const { centered, className, children, dark, light, primary, secondary, third, ...rest } = props
  const headerClass = classnames('bit-header', {
    'bit-header--centered': centered,
    'bit-header--dark': dark,
    'bit-header--light': light,
    'bit-header--primary': primary,
    'bit-header--secondary': secondary,
    'bit-header--third': third,
  }, className)
  return (
    <div className={headerClass} {...rest}>
      {children}
    </div>
  )
}

Header.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  third: PropTypes.bool,
}

export default Header
