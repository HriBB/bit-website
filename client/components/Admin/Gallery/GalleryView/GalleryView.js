import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
import update from 'react-addons-update'
import gql from 'graphql-tag'

import Loader from 'components/ux/Loader'
import Content from 'components/ux/Content'
import Title from 'components/ux/Title'
import Item from 'components/ux/Title/Item'
import Button from 'components/ux/Button'
import IconLink from 'components/ux/IconLink'
import Masonry, { MasonryItem } from 'components/ux/Masonry'
import GalleryImage from './GalleryImage'

import './GalleryView.scss'

class GalleryView extends Component {

  constructor(props) {
    super(props)
    this.editGallery = this.editGallery.bind(this)
    this.addImages = this.addImages.bind(this)
    this.openImage = this.openImage.bind(this)
    this.editImage = this.editImage.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
  }

  editGallery() {
    this.props.actions.editGallery(this.props.data.gallery)
  }

  addImages() {
    this.props.actions.addImages(this.props.data.gallery)
  }

  openImage(image) {
    console.log('open image', image);
  }

  editImage(image) {
    this.props.actions.editImage(image)
  }

  deleteImage(image) {
    const { deleteImage } = this.props
    const { id } = image
    deleteImage({ variables: { id } })
      .then(({ data }) => {
        console.log('deleteImage success', data);
      }).catch((error) => {
        console.log('deleteImage error', error);
      });
  }

  render() {
    const { actions, data: { error, loading, gallery } } = this.props
    if (error) return <Title>{error.message}</Title>
    if (loading) return <Loader/>
    return (
      <Content className={'bit-admin-gallery-view'}>
        <Title>
          <IconLink to={'/admin/gallery'} name={'navigate_before'}/>
          <Item>{gallery.name}</Item>
          <Button onClick={this.editGallery}>Edit Gallery</Button>
          <Button onClick={this.addImages}>Add Images</Button>
        </Title>
        <Masonry>
          {gallery.images.map((image, index) =>
            <MasonryItem key={image.id} big={index === 0}>
              <GalleryImage
                gallery={gallery}
                image={image}
                open={this.openImage}
                edit={this.editImage}
                delete={this.deleteImage}
              />
            </MasonryItem>
          )}
        </Masonry>
      </Content>
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
      }
    }
  }
`

const DELETE_IMAGE = gql`
  mutation deleteImage($id: String!) {
    deleteImage(id: $id)
  }
`

const GalleryViewWithData = compose(
  graphql(GET_GALLERY, {
    options: props => ({
      variables: { slug: props.params.slug }
    })
  }),
  graphql(DELETE_IMAGE, {
    name: 'deleteImage',
    options: props => ({
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
          console.log('UPDATE GALLERIES');
          const gallery = props.data.gallery
          const index = prev.galleries.findIndex(g => g.id === gallery.id)
          if (index === -1) return prev // gallery not found, return prev state

          const next = update(prev, {
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

          console.log(next);

          return next

        }
      }
    })
  })
)(GalleryView)

export default GalleryViewWithData
