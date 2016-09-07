import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './GalleryImage.scss'

import Button from 'components/ux/Button'
import IconButton from 'components/ux/IconButton'
import Menu, { MenuItem } from 'components/ux/Menu'

export default class GalleryImage extends Component {

  static propTypes = {
    gallery: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
  }

  editImage = (e) => {
    console.log('edit');
  }

  openImage = (e) => {
    console.log('open');
  }

  deleteImage = (e) => {
    console.log('delete');
  }

  render() {
    const { gallery, image } = this.props
    const id = `image-menu-${image.id}`
    return (
      <div className={'bit-admin-gallery-image'}>
        <img src={image.small} />
        <Menu target={<IconButton name={'more_vert'}/>} align={'right'}>
          <MenuItem onClick={this.editImage}>Edit Image</MenuItem>
          <MenuItem onClick={this.openImage}>Open Image</MenuItem>
          <MenuItem onClick={this.deleteImage}>Delete Image</MenuItem>
        </Menu>
      </div>
    )
  }

}
