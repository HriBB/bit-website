import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Link, Match } from 'react-router'
import { compose, graphql } from 'react-apollo'
import update from 'react-addons-update'
import gql from 'graphql-tag'

import GalleryList from './GalleryList'
import GalleryView from './GalleryView'

import AddGallery from './AddGallery'
import EditGallery from './EditGallery'
import AddImages from './AddImages'
import EditImage from './EditImage'

import {
  Modal,
} from 'components/ux'

class Gallery extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      addGallery: false,
      editGallery: false,
      addImages: false,
      editImage: false,
    }
  }

  addGallery = () => {
    this.setState({ addGallery: true })
  }

  editGallery = (gallery) => {
    this.setState({ editGallery: gallery })
  }

  deleteGallery = (gallery) => {
    const { deleteGallery } = this.props
    const { id } = gallery
    deleteGallery(id)
      .then(({ data }) => {
        //console.log('deleteGallery success', data);
      }).catch((error) => {
        //console.log('deleteGallery error', error);
      });
  }

  addImages = (gallery) => {
    this.setState({ addImages: gallery })
  }

  editImage = (image) => {
    this.setState({ editImage: image })
  }

  deleteImage = (image) => {
    const { deleteGalleryImage } = this.props
    const { id } = image
    deleteGalleryImage(id)
      .then(({ data }) => {
        //console.log('deleteGalleryImage success', data);
      }).catch((error) => {
        //console.log('deleteGalleryImage error', error);
      });
  }

  closeModal = () => {
    this.setState({
      addGallery: false,
      editGallery: false,
      addImages: false,
      editImage: false,
    })
  }

  render() {
    const { children, pathname } = this.props
    const { addGallery, editGallery, addImages, editImage } = this.state
    const actions = {
      addGallery: this.addGallery,
      editGallery: this.editGallery,
      deleteGallery: this.deleteGallery,
      addImages: this.addImages,
      editImage: this.editImage,
      deleteImage: this.deleteImage,
    }
    return (
      <div>

        <Match pattern={''} render={(props) => <GalleryList {...props} {...actions}/>}/>
        <Match pattern={'/gallery/:gallery/:image?'} render={(props) => <GalleryView {...props} {...actions}/>}/>

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

const DELETE_GALLERY = gql`
  mutation deleteGallery($id: String!) {
    deleteGallery(id: $id)
  }`

const DELETE_GALLERY_IMAGE = gql`
  mutation deleteGalleryImage($id: String!) {
    deleteGalleryImage(id: $id) {
      id
      images {
        id slug name filename description
        small medium large full
      }
    }
  }`

export default compose(
  graphql(DELETE_GALLERY, {
    props: ({ ownProps, mutate }) => ({
      deleteGallery: (id) => mutate({
        variables: { id },
        updateQueries: {
          galleries: (prev, { mutationResult }) => {
            const id = mutationResult.data.deleteGallery
            return update(prev, {
              galleries: { $apply: galleries => galleries.filter(g => g.id !== id)}
            })
          },
        },
      }),
    }),
  }),
  graphql(DELETE_GALLERY_IMAGE, {
    props: ({ ownProps, mutate }) => ({
      deleteGalleryImage: (id) => mutate({
        variables: { id },
        updateQueries: {
          gallery: (prev, { mutationResult }) => {
            const gallery = mutationResult.data.deleteGalleryImage
            if (!prev.gallery || prev.gallery.id !== gallery.id) return prev
            return update(prev, {
              gallery: {
                $apply: g => {
                  if (g.image) g.image = gallery.images[0] || null
                  if (g.images) g.images = gallery.images
                  return g
                }
              }
            })
          },
          galleries: (prev, { mutationResult }) => {
            if (!prev.galleries) return prev
            const gallery = mutationResult.data.deleteGalleryImage
            const index = prev.galleries.findIndex(g => g.id === gallery.id)
            if (index === -1) return prev
            return update(prev, {
              galleries: {
                [index]: {
                  $apply: g => {
                    if (g.image) g.image = gallery.images[0] || null
                    if (g.images) g.images = gallery.images
                    return g
                  }
                }
              }
            })
          },
        },
      }),
    }),
  }),
)(Gallery)
