import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
          <IconLink to={'/admin/gallery'} name={'navigate_before'}/>
          <Item>{gallery.name}</Item>
          <Button onClick={this.editGallery}>Edit Gallery</Button>
          <Button onClick={this.addImages}>Add Images</Button>
        </Title>
        <Masonry>
          {gallery.images.map((image, index) =>
            <MasonryItem key={image.id} big={index === 0}>
              <GalleryImage gallery={gallery} image={image}/>
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
