import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
import update from 'react-addons-update'
import gql from 'graphql-tag'

import Error from 'components/Error'
import GalleryImage from './GalleryImage'

import {
  Layout,
  Header,
  Content,
  Title,
  Loader,
  Button,
  IconLink,
  IconButton,
  Menu,
  MenuItem,
  Masonry,
  MasonryItem,
  ModalSlider,
  ModalSliderItem,
} from 'components/ux'

import './GalleryView.scss'

class GalleryView extends Component {

  static propTypes = {
    addGallery: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    deleteGallery: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    editGallery: PropTypes.func.isRequired,
    editImage: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  editGallery = () => {
    this.props.editGallery(this.props.data.gallery)
  }

  addImages = () => {
    this.props.addImages(this.props.data.gallery)
  }

  openImage = (image) => {
    this.context.router.transitionTo(`/gallery/${this.props.params.gallery}/${image.slug}`)
  }

  closeImage = () => {
    this.context.router.transitionTo(`/gallery/${this.props.params.gallery}`)
  }

  render() {
    const {
      params,
      addGallery, editGallery, deleteGallery,
      addImages, editImage, deleteImage,
      data: { error, loading, gallery },
    } = this.props
    if (error) return <Error>{error.message}</Error>
    if (loading) return <Loader/>
    if (!gallery) return <Error>Gallery '{params.gallery}' does not exist.</Error>
    return (
      <Layout className={'bit-gallery-view'} centered>
        <Header>
          <IconLink to={'/gallery'} name={'navigate_before'}/>
          <Title>{gallery.name}</Title>
          <Menu target={<IconButton name={'more_vert'}/>} align={'left'}>
            <MenuItem onClick={this.editGallery}>Edit Gallery</MenuItem>
            <MenuItem onClick={this.addImages}>Add Images</MenuItem>
          </Menu>
        </Header>
        <Content>
          <Masonry>
            {gallery.images.map((image, index) =>
              <MasonryItem key={image.id} big={index === 0}>
                <GalleryImage
                  gallery={gallery}
                  image={image}
                  openImage={this.openImage}
                  editImage={editImage}
                  deleteImage={deleteImage}
                />
              </MasonryItem>
            )}
          </Masonry>
        </Content>
        {params.image &&
          <ModalSlider isOpen close={this.closeImage}>
            {gallery.images.map(image =>
              <div key={image.id}>
                <ModalSliderItem
                  key={image.id}
                  image={image.full}
                />
              </div>
            )}
          </ModalSlider>}
      </Layout>
    )
  }

}

const GET_GALLERY = gql`
  query gallery($slug: String!) {
    gallery(slug: $slug) {
      id
      slug
      name
      description
      images {
        id
        slug
        name
        filename
        description
        small
        full
      }
    }
  }`

export default compose(
  graphql(GET_GALLERY, {
    options: props => ({
      variables: { slug: props.params.gallery }
    })
  }),
)(GalleryView)
