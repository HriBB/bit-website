import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import config from 'config'

import './GalleryListItem.scss'

import IconButton from 'components/ux/IconButton'
import Menu, { MenuItem } from 'components/ux/Menu'
import Card, { Image, Title, Content } from 'components/ux/Card'

export default class GallerListItem extends Component {

  static propTypes = {
    addImages: PropTypes.func.isRequired,
    deleteGallery: PropTypes.func.isRequired,
    editGallery: PropTypes.func.isRequired,
    gallery: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.openGallery = this.openGallery.bind(this)
    this.editGallery = this.editGallery.bind(this)
    this.addImages = this.addImages.bind(this)
    this.deleteGallery = this.deleteGallery.bind(this)
  }

  openGallery() {
    this.context.router.push(`/gallery/${this.props.gallery.slug}`)
  }

  editGallery() {
    this.props.editGallery(this.props.gallery)
  }

  addImages() {
    this.props.addImages(this.props.gallery)
  }

  deleteGallery() {
    this.props.deleteGallery(this.props.gallery)
  }

  render() {
    const { gallery } = this.props
    const image = gallery.image && gallery.image.small || config.image.placeholder
    return (
      <div className={'bit-gallery-list-item'}>
        <Card>
          <Image src={image} alt={gallery.name} onClick={this.openGallery}>
            <Title>{gallery.name}</Title>
            <Menu target={<IconButton name={'more_vert'}/>} align={'right'}>
              <MenuItem onClick={this.openGallery}>Open Gallery</MenuItem>
              <MenuItem onClick={this.editGallery}>Edit Gallery</MenuItem>
              <MenuItem onClick={this.addImages}>Add Images</MenuItem>
              <MenuItem onClick={this.deleteGallery}>Delete Gallery</MenuItem>
            </Menu>
          </Image>
          <Content>{gallery.description}</Content>
        </Card>
      </div>
    )
  }

}