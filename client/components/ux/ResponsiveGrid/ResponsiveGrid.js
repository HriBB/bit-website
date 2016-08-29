import React, { Component, PropTypes } from 'react'
import Masonry from 'react-masonry-component'
import classnames from 'classnames'

import './ResponsiveGrid.scss'

const masonryOptions = {
  itemSelector: '.responsive-grid__item',
  columnWidth: '.responsive-grid__sizer',
  percentPosition: true,
  transitionDuration: 250,
}

const ResponsiveGrid = props => {
  const { className, big, children } = props
  const masonryClass = classnames({
    'responsive-grid': true,
    'responsive-grid--big': big,
  }, className)
  return (
    <Masonry className={masonryClass} options={masonryOptions} updateOnEachImageLoad={true}>
      <div className={'responsive-grid__sizer'}></div>
      {children}
    </Masonry>
  )
}

ResponsiveGrid.propTypes = {
  className: PropTypes.string,
  big: PropTypes.bool,
  children: PropTypes.array.isRequired,
}

export default ResponsiveGrid
