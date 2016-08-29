import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import './GalleryView.scss'

class GalleryView extends Component {

  render() {
    const { data: { error, loading, gallery} } = this.props
    if (error) return <h1>{error.message}</h1>
    if (loading) return <h1>Loading ...</h1>
    return (
      <div className={'bit-admin-gallery-view'}>
        <h1>{gallery.name}</h1>
      </div>
    )
  }

}

const GET_GALLERIES = gql`
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
        description
      }
    }
  }
`

const withData = graphql(GET_GALLERIES, {
  options: ownProps => ({ variables: { slug: ownProps.params.slug } })
})

const GalleryViewWithData = withData(GalleryView)

export default GalleryViewWithData
