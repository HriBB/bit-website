import React, { Component, PropTypes } from 'react'
import { compose, graphql } from 'react-apollo'
import update from 'react-addons-update'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

import {
  Layout,
  Header,
  Content,
  Footer,
  Title,
  Button,
  IconButton,
  Uploadfield,
  fileList,
} from 'components/ux'

import './AddImages.scss'

class AddImages extends Component {

  static propTypes = {
    gallery: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    readImages: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { uploading: false }
    this.files = null
  }

  upload = () => {
    const { gallery, close, uploadGalleryImages } = this.props
    this.setState({ uploading: true })
    uploadGalleryImages(gallery.id, this.files)
      .then(({ data }) => {
        console.log('data', data);
        this.setState({ uploading: false })
      })
      .catch(error => {
        console.log('error', error.message);
        this.setState({ uploading: false })
      })
  }

  changeFiles = (e) => {
    this.files = e.target.files
    this.props.readImages(e)
  }

  render() {
    const { images, close } = this.props
    const { uploading } = this.state
    return (
      <Layout className={'bit-add-images'}>
        <Header third dark>
          <Title flex>Add Images</Title>
          {!uploading && <IconButton name={'close'} onClick={close}/>}
        </Header>
        <Content className={'bit-add-images__content'}>
          <div className={'bit-add-images__input'}>
            <Uploadfield multiple name={'files'} onChange={this.changeFiles} />
          </div>
          <div className={'bit-add-images__images'}>
            {images}
          </div>
        </Content>
        <Footer>
          <Button onClick={this.upload} disabled={uploading}>
            {uploading ? 'Uploading ...' : 'Upload'}
          </Button>
        </Footer>
      </Layout>
    )
  }

}

const UPLOAD_GALLERY_IMAGES = gql`
  mutation uploadGalleryImages($id: String!, $files: [UploadedFile!]!) {
    uploadGalleryImages(id: $id, files: $files) {
      id
      slug
      name
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
  fileList(),
  graphql(UPLOAD_GALLERY_IMAGES, {
    props: ({ ownProps, mutate }) => ({
      uploadGalleryImages: (id, files) => mutate({
        variables: { id, files },
      }),
    }),
  }),
)(AddImages)
