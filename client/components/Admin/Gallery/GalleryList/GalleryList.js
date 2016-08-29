import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { ResponsiveGrid, ResponsiveGridItem } from 'components/ux/ResponsiveGrid'
import Button from 'components/ux/Button'
import GalleryListItem from './GalleryListItem'

import './GalleryList.scss'

class GalleryList extends Component {

  render() {
    console.log(this.props.actions);
    const {
      actions: { addGallery },
      data: { error, loading, galleries }
    } = this.props
    if (error) return <h2>{error.message}</h2>
    if (loading) return <h2>Loading ...</h2>
    return (
      <div className={'bit-admin-gallery-list'}>
        <Button onClick={addGallery}>Add gallery</Button>
        <ResponsiveGrid className={'bit-admin-gallery-list__items'}>
          {galleries.map(gallery =>
            <ResponsiveGridItem key={gallery.id}>
              <GalleryListItem gallery={gallery} />
            </ResponsiveGridItem>
          )}
        </ResponsiveGrid>
      </div>
    )
  }

}

const GET_GALLERIES = gql`
  query galleries {
    galleries {
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

const withData = graphql(GET_GALLERIES)

const GalleryListWithData = withData(GalleryList)

export default GalleryListWithData
