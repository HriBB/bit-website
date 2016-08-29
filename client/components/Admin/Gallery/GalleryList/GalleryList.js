import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
  ResponsiveGrid,
  ResponsiveGridItem,
} from 'components/ux/ResponsiveGrid'

import Modal from 'components/ux/Modal'
import Button from 'components/ux/Button'
import AddGallery from '../AddGallery'
import GalleryListItem from './GalleryListItem'

import './GalleryList.scss'

class GalleryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addGallery: false,
      editGallery: false,
    }
    this.addGallery = this.addGallery.bind(this)
    this.editGallery = this.editGallery.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  addGallery() {
    this.setState({ addGallery: true })
  }

  editGallery(gallery) {
    this.setState({ editGallery: gallery })
  }

  closeModal() {
    this.setState({ addGallery: false, editGallery: false })
  }

  render() {
    const { data: { error, loading, galleries } } = this.props
    const { addGallery, editGallery } = this.state
    if (error) return <h2>{error.message}</h2>
    if (loading) return <h2>Loading ...</h2>
    return (
      <div className={'bit-admin-gallery-list'}>
        <Button onClick={this.addGallery}>Add gallery</Button>

        <ResponsiveGrid className={'bit-admin-gallery-list__items'}>
          {galleries.map(gallery =>
            <ResponsiveGridItem key={gallery.id}>
              <GalleryListItem gallery={gallery} />
            </ResponsiveGridItem>
          )}
        </ResponsiveGrid>

        {addGallery &&
          <Modal isOpen onRequestClose={this.closeModal}>
            <AddGallery close={this.closeModal}/>
          </Modal>}

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
