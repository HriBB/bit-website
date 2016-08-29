import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './GalleryListItem.scss'

const GalleryListItem = props => {
  const { gallery } = props
  return (
    <Link className={'bit-admin-gallery-list-item'} to={`/admin/gallery/${gallery.slug}`}>
      <div>
        <h2>{gallery.name}</h2>
        <p>{gallery.description}</p>
      </div>
    </Link>
  )
}

GalleryListItem.propTypes = {
  gallery: PropTypes.object.isRequired,
}

export default GalleryListItem
