import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fetch from 'isomorphic-fetch'

import {
  Layout,
  Header,
  Content,
  Footer,
  Title,
  Button,
  IconButton,
  Uploadfield,
  FileList,
} from 'components/ux'

import './AddImages.scss'

class AddImages extends Component {

  static contextTypes = {
    emitter: PropTypes.object.isRequired,
  }

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
    const { emitter } = this.context
    const { gallery, close } = this.props
    const formData = new FormData()
    formData.append('type', 'gallery')
    formData.append('id', gallery.id)
    Array.from(this.files).map(f => formData.append('files', f))
    const options = {
      method: 'POST',
      body: formData
    }
    this.setState({ uploading: true })
    return fetch('http://localhost:4000/upload', options)
      .then(response => response.json())
      .then(json => {
        console.log('upload done', json);
        this.setState({ uploading: false })
        emitter.emit('upload-complete')
        close()
      })
      .catch(err => {
        console.log('upload failed', err);
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
            <Uploadfield
              name={'files'}
              onChange={this.changeFiles}
              multiple
            />
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

export default FileList(AddImages)
