import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import config from 'config'

import './GalleryListItem.scss'

import Card, { Image, Title, Content } from 'components/ux/Card'

const GalleryListItem = props => {
  const { gallery } = props
  const image = gallery.image && gallery.image.small || config.image.placeholder
  return (
    <div className={'bit-admin-gallery-list-item'}>
      <Card>
        <Link to={`/admin/gallery/${gallery.slug}`}>
          <Image src={image} alt={gallery.name}/>
        </Link>
        <Title>{gallery.name}</Title>
        <Content>{gallery.description}</Content>
      </Card>
    </div>
  )
}

GalleryListItem.propTypes = {
  gallery: PropTypes.object.isRequired,
}

export default GalleryListItem
