import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './GalleryImage.scss'

import Button from 'components/ux/Button'
import IconButton from 'components/ux/IconButton'
import Menu, { MenuItem } from 'components/ux/Menu'

export default class GalleryImage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    gallery: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.editImage = this.editImage.bind(this)
    this.openImage = this.openImage.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
  }

  editImage(e) {
    this.props.actions.editImage(this.props.image)
  }

  openImage(e) {
    console.log('open');
  }

  deleteImage(e) {
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
