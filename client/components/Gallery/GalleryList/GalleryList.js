import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Error from 'components/Error'
import GalleryListItem from './GalleryListItem'

import {
  Layout,
  Content,
  Header,
  Title,
  Loader,
  Button,
  IconButton,
  IconLink,
  Menu,
  MenuItem,
  Masonry,
  MasonryItem,
} from 'components/ux'

import './GalleryList.scss'

class GalleryList extends Component {

  static propTypes = {
    addGallery: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    deleteGallery: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    editGallery: PropTypes.func.isRequired,
    editImage: PropTypes.func.isRequired,
  }

  refresh = () => {
    this.props.data.refetch()
  }

  render() {
    const {
      addGallery, editGallery, deleteGallery,
      addImages, editImage, deleteImage,
      data: { error, loading, galleries },
    } = this.props
    if (error) return <Error>{error.message}</Error>
    if (loading) return <Loader/>
    return (
      <Layout className={'bit-gallery-list'} centered>
        <Header light>
          <IconLink to={'/'} name={'navigate_before'}/>
          <Title>Gallery</Title>
          <Menu target={<IconButton name={'more_vert'}/>} align={'left'}>
            <MenuItem onClick={addGallery}>Add Gallery</MenuItem>
          </Menu>
        </Header>
        <Content>
          <Masonry big>
            {galleries.map(gallery =>
              <MasonryItem key={gallery.id}>
                <GalleryListItem
                  gallery={gallery}
                  addImages={addImages}
                  deleteGallery={deleteGallery}
                  editGallery={editGallery}
                />
              </MasonryItem>
            )}
          </Masonry>
        </Content>
      </Layout>
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
      image {
        id
        slug
        name
        description
        small
      }
    }
  }`

export default compose(
  graphql(GET_GALLERIES),
)(GalleryList)
