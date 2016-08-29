import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const Gallery = props => {
  const { children } = props
  return (
    <div className={'bit-admin-gallery'}>
      {children}
    </div>
  )
}

Gallery.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Gallery
