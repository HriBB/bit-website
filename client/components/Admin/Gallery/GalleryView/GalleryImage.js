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
    open: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
  }

  open() {
    this.props.open(this.props.image)
  }

  edit() {
    this.props.edit(this.props.image)
  }

  delete() {
    this.props.delete(this.props.image)
  }

  render() {
    const { gallery, image } = this.props
    const id = `image-menu-${image.id}`
    return (
      <div className={'bit-admin-gallery-image'}>
        <img src={image.small} />
        <Menu target={<IconButton name={'more_vert'}/>} align={'right'}>
          <MenuItem onClick={this.edit}>Edit Image</MenuItem>
          <MenuItem onClick={this.open}>Open Image</MenuItem>
          <MenuItem onClick={this.delete}>Delete Image</MenuItem>
        </Menu>
      </div>
    )
  }

}
