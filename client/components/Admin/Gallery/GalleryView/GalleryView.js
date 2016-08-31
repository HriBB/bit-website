import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Content from 'components/ux/Content'
import Title from 'components/ux/Title'
import Button from 'components/ux/Button'
import Masonry, { MasonryItem } from 'components/ux/Masonry'

import './GalleryView.scss'

class GalleryView extends Component {

  constructor(props) {
    super(props)
    this.editGallery = this.editGallery.bind(this)
    this.addImages = this.addImages.bind(this)
  }

  editGallery() {
    this.props.actions.editGallery(this.props.data.gallery)
  }

  addImages() {
    this.props.actions.addImages(this.props.data.gallery)
  }

  render() {
    const { data: { error, loading, gallery } } = this.props
    if (error) return <Title>{error.message}</Title>
    if (loading) return <Title>Loading ...</Title>
    return (
      <Content className={'bit-admin-gallery-view'}>
        <Title>
          {gallery.name}
          <Button onClick={this.editGallery}>Edit Gallery</Button>
          <Button onClick={this.addImages}>Add Images</Button>
        </Title>
        <Masonry>
          {gallery.images.map((image, index) =>
            <MasonryItem key={image.id} big={index === 0}>
              <img src={image.small} />
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

const withData = graphql(GET_GALLERY, {
  options: ownProps => ({ variables: { slug: ownProps.params.slug } })
})

export default withData(GalleryView)
