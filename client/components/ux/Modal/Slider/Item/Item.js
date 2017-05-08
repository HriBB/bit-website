import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Item.scss'

const Item = props => {
  const { className, children, image } = props
  const itemClass = classnames('modal-slider-item', {
    'modal-slider-item--image': image
  }, className)
  const itemStyle = {}
  if (image) {
    itemStyle.backgroundImage = `url(${image})`
  }
  return (
    <div className={itemClass} style={itemStyle}>
      {children}
    </div>
  )
}

Item.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  image: PropTypes.string,
}

export default Item
