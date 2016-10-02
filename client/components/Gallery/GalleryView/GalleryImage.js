import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
} from 'components/ux'

import './GalleryImage.scss'

export default class GalleryImage extends Component {

  static propTypes = {
    gallery: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    openImage: PropTypes.func.isRequired,
    editImage: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
  }

  openImage = () => {
    this.props.openImage(this.props.image)
  }

  editImage = () => {
    this.props.editImage(this.props.image)
  }

  deleteImage = () => {
    this.props.deleteImage(this.props.image)
  }

  render() {
    const { gallery, image } = this.props
    const id = `image-menu-${image.id}`
    return (
      <div className={'bit-gallery-image'}>
        <img src={image.small} onClick={this.openImage} />
        <Menu target={<IconButton name={'more_vert'}/>} align={'right'}>
          <MenuItem onClick={this.openImage}>Open Image</MenuItem>
          <MenuItem onClick={this.editImage}>Edit Image</MenuItem>
          <MenuItem onClick={this.deleteImage}>Delete Image</MenuItem>
        </Menu>
      </div>
    )
  }

}
