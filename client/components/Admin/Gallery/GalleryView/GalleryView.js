import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Button from 'components/ux/Button'

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
    if (error) return <h1>{error.message}</h1>
    if (loading) return <h1>Loading ...</h1>
    return (
      <div className={'bit-admin-gallery-view'}>
        <h1>{gallery.name}</h1>
        <Button onClick={this.editGallery}>Edit Gallery</Button>
        <Button onClick={this.addImages}>Add Images</Button>
      </div>
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
      }
    }
  }
`

const withData = graphql(GET_GALLERY, {
  options: ownProps => ({ variables: { slug: ownProps.params.slug } })
})

export default withData(GalleryView)
