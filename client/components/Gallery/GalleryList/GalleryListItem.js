import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import config from 'config'

import {
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardImage,
  CardTitle,
  CardContent,
} from 'components/ux'

import './GalleryListItem.scss'

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

  openGallery = () => {
    this.context.router.transitionTo(`/gallery/${this.props.gallery.slug}`)
  }

  editGallery = () => {
    this.props.editGallery(this.props.gallery)
  }

  addImages = () => {
    this.props.addImages(this.props.gallery)
  }

  deleteGallery = () => {
    this.props.deleteGallery(this.props.gallery)
  }

  render() {
    const { gallery } = this.props
    const image = gallery.image && gallery.image.small || config.image.placeholder
    return (
      <div className={'bit-gallery-list-item'}>
        <Card>
          <CardImage src={image} alt={gallery.name} onClick={this.openGallery}>
            <CardTitle>{gallery.name}</CardTitle>
            <Menu target={<IconButton name={'more_vert'}/>} align={'right'}>
              <MenuItem onClick={this.openGallery}>Open Gallery</MenuItem>
              <MenuItem onClick={this.editGallery}>Edit Gallery</MenuItem>
              <MenuItem onClick={this.addImages}>Add Images</MenuItem>
              <MenuItem onClick={this.deleteGallery}>Delete Gallery</MenuItem>
            </Menu>
          </CardImage>
          <CardContent>{gallery.description}</CardContent>
        </Card>
      </div>
    )
  }

}
