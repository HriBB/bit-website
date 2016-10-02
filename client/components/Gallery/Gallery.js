import React, { Component, Children, PropTypes, cloneElement } from 'react'
import { compose, graphql } from 'react-apollo'
import update from 'react-addons-update'
import gql from 'graphql-tag'
import { Link } from 'react-router'

import AddGallery from './AddGallery'
import EditGallery from './EditGallery'
import AddImages from './AddImages'
import EditImage from './EditImage'

import {
  Modal,
} from 'components/ux'

class Gallery extends Component {

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
    this.deleteGallery = this.deleteGallery.bind(this)
    this.addImages = this.addImages.bind(this)
    this.editImage = this.editImage.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  addGallery() {
    this.setState({ addGallery: true })
  }

  editGallery(gallery) {
    this.setState({ editGallery: gallery })
  }

  deleteGallery(gallery) {
    console.log('todo delete gallery');
  }

  addImages(gallery) {
    this.setState({ addImages: gallery })
  }

  editImage(image) {
    this.setState({ editImage: image })
  }

  deleteImage(image) {
    console.log('todo delete image');
    /*
    const { deleteImage } = this.props
    const { id } = image
    deleteImage({ variables: { id } })
      .then(({ data }) => {
        console.log('deleteImage success', data);
      }).catch((error) => {
        console.log('deleteImage error', error);
      });
    */
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
          addGallery: this.addGallery,
          editGallery: this.editGallery,
          deleteGallery: this.deleteGallery,
          addImages: this.addImages,
          editImage: this.editImage,
          deleteImage: this.deleteImage,
        }))}

        {addGallery &&
          <Modal isOpen centered onRequestClose={this.closeModal}>
            <AddGallery close={this.closeModal}/>
          </Modal>}

        {editGallery &&
          <Modal isOpen centered onRequestClose={this.closeModal}>
            <EditGallery gallery={editGallery} close={this.closeModal}/>
          </Modal>}

        {addImages &&
          <Modal isOpen centered onRequestClose={this.closeModal}>
            <AddImages gallery={addImages} close={this.closeModal}/>
          </Modal>}

        {editImage &&
          <Modal isOpen centered onRequestClose={this.closeModal}>
            <EditImage image={editImage} close={this.closeModal}/>
          </Modal>}

      </div>
    )
  }
}

const DELETE_IMAGE = gql`
  mutation deleteImage($id: String!) {
    deleteImage(id: $id)
  }`

export default compose(
  graphql(DELETE_IMAGE, {
    name: 'deleteImage',
    options: ownProps => ({
      updateQueries: {
        gallery: (prev, { mutationResult }) => {
          const id = mutationResult.data.deleteImage
          return update(prev, {
            gallery: {
              images: { $apply: images => images.filter(i => i.id !== id)}
            }
          })
        },
        galleries: (prev, { mutationResult }) => {
          const gallery = ownProps.data.gallery
          const index = prev.galleries.findIndex(g => g.id === gallery.id)
          if (index === -1) return prev // gallery not found, return prev state
          return update(prev, {
            galleries: {
              [index]: {
                $apply: g => {
                  // $apply updates gallery object
                  // @see https://facebook.github.io/react/docs/update.html
                  // this code will replace images
                  const imageId = mutationResult.data.deleteImage
                  const images = gallery.images.filter(i => i.id !== imageId)
                  if (g.images && g.images.length) {
                    g.images = images || []
                  }
                  if (g.image && g.image.id === imageId) {
                    g.image = images[0] || null
                  }
                  return g
                }
              }
            }
          })
        },
      },
    }),
  }),
)(Gallery)
