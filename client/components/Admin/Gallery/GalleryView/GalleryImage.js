import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './GalleryImage.scss'

import IconButton from 'components/ux/IconButton'

export default class GalleryImage extends Component {

  static propTypes = {
    gallery: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
  }

  render() {
    const { gallery, image } = this.props
    const id = `image-menu-${image.id}`
    return (
      <div className={'bit-admin-gallery-image'}>
        <img src={image.small} />
        <IconButton name={'more_vert'}/>
        {/*
        <IconButton id={id} name={'more_vert'}/>
        <Menu target={id} align={'right'}>
          <MenuItem>Edit Image</MenuItem>
          <MenuItem>Delete Image</MenuItem>
        </Menu>
        */}
      </div>
    )
  }

}
