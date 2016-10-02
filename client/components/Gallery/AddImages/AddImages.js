import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fetch from 'isomorphic-fetch'

import { Layout, Header, Content, Footer, Title } from 'components/ux/Layout'
import FileList from 'components/ux/FileList'
import Uploadfield from 'components/ux/Uploadfield'
import Button from 'components/ux/Button'
import IconButton from 'components/ux/IconButton'

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
    this.upload = this.upload.bind(this)
    this.changeFiles = this.changeFiles.bind(this)
  }

  upload() {
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
        close()
      })
      .catch(err => {
        console.log('upload failed', err);
        this.setState({ uploading: false })
      })
  }

  changeFiles(e) {
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
          <IconButton name={'close'} onClick={close}/>
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
          <Button onClick={this.upload} disabled={uploading}>Save</Button>
        </Footer>
      </Layout>
    )
  }

}

export default FileList(AddImages)