import React, { Component, Children, PropTypes, cloneElement } from 'react'
import { Link } from 'react-router'

import Modal from 'components/ux/Modal'
import AddGallery from './AddGallery'
import EditGallery from './EditGallery'
import AddImages from './AddImages'
import EditImage from './EditImage'

export default class Gallery extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      addGallery: false,
      editGallery: false,
      addImages: false,
      editImage: false,
    }
    this.addGallery = this.addGallery.bind(this)
    this.editGallery = this.editGallery.bind(this)
    this.addImages = this.addImages.bind(this)
    this.editImage = this.editImage.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  addGallery() {
    this.setState({ addGallery: true })
  }

  editGallery(gallery) {
    this.setState({ editGallery: gallery })
  }

  addImages(gallery) {
    this.setState({ addImages: gallery })
  }

  editImage(image) {
    this.setState({ editImage: image })
  }

  closeModal() {
    this.setState({
      addGallery: false,
      editGallery: false,
      addImages: false,
      editImage: false,
    })
  }

  render() {
    const { children } = this.props
    const { addGallery, editGallery, addImages, editImage } = this.state
    return (
      <div>

        {Children.map(children, child => cloneElement(child, {
          actions: {
            addGallery: this.addGallery,
            editGallery: this.editGallery,
            addImages: this.addImages,
            editImage: this.editImage,
          }
        }))}

        {addGallery &&
          <Modal isOpen onRequestClose={this.closeModal}>
            <AddGallery close={this.closeModal}/>
          </Modal>}

        {editGallery &&
          <Modal isOpen onRequestClose={this.closeModal}>
            <EditGallery gallery={editGallery} close={this.closeModal}/>
          </Modal>}

        {addImages &&
          <Modal isOpen onRequestClose={this.closeModal}>
            <AddImages gallery={addImages} close={this.closeModal}/>
          </Modal>}

        {editImage &&
          <Modal isOpen onRequestClose={this.closeModal}>
            <EditImage image={editImage} close={this.closeModal}/>
          </Modal>}

      </div>
    )
  }
}
