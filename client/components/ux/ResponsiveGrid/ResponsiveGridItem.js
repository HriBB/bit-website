import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

const ResponsiveGridItem = props => {
  const { className, big, children } = props
  const itemClass = classnames({
    'responsive-grid__item': true,
    'responsive-grid__item--big': big,
  }, className)
  return (
    <div className={itemClass}>
      {children}
    </div>
  )
}

ResponsiveGridItem.propTypes = {
  className: PropTypes.string,
  big: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

export default ResponsiveGridItem
