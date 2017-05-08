import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
  Layout,
  Header,
  Content,
  Footer,
  Title,
  Button,
  IconButton,
  Textfield,
  Textarea,
} from 'components/ux'

import './EditImage.scss'

class EditImage extends Component {

  static propTypes = {
    image: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      name: props.image.name,
      description: props.image.description,
      error: null,
    }
  }

  save = () => {
    const { image, updateGalleryImage, close } = this.props
    const { name, description } = this.state
    const { id } = image
    updateGalleryImage(id, name, description)
      .then(({ data: { updateGalleryImage } }) => {
        close()
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }

  changeName = (e) => {
    this.setState({ name: e.target.value })
  }

  changeDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  render() {
    const { close } = this.props
    const { name, description, error } = this.state
    return (
      <Layout>
        <Header third dark>
          <Title flex>Edit Image</Title>
          <IconButton name={'close'} onClick={close}/>
        </Header>
        <Content>
          <Textfield
            placeholder={'Image Name'}
            name={'name'}
            value={name}
            onChange={this.changeName}
          />
          <Textarea
            placeholder={'Image Description'}
            name={'description'}
            value={description}
            onChange={this.changeDescription}
            rows={5}
          />
          {error && <span>{error}</span>}
        </Content>
        <Footer>
          <Button onClick={this.save}>Save</Button>
        </Footer>
      </Layout>
    )
  }

}

const UPDATE_GALLERY_IMAGE = gql`
  mutation updateGalleryImage($id: String!, $name: String!, $description: String) {
    updateGalleryImage(id: $id, name: $name, description: $description) {
      id
      slug name filename extension description
      url small medium large full
    }
  }
`

export default compose(
  graphql(UPDATE_GALLERY_IMAGE, {
    props: ({ ownProps, mutate }) => ({
      updateGalleryImage: (id, name, description) => mutate({
        variables: { id, name, description },
      }),
    }),
  }),
)(EditImage)
