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

import './EditGallery.scss'

class EditGallery extends Component {

  static propTypes = {
    gallery: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      name: props.gallery.name,
      description: props.gallery.description,
      error: null,
    }
  }

  save = () => {
    const { gallery, updateGallery, close } = this.props
    const { name, description } = this.state
    const { id, slug } = gallery
    updateGallery({ variables: { id, name, description } })
      .then(({ data: { updateGallery } }) => {
        close()
        if (updateGallery.slug !== slug) {
          this.context.router.transitionTo(`/gallery/${updateGallery.slug}`)
        }
      }).catch(error => {
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
          <Title flex>Edit Gallery</Title>
          <IconButton name={'close'} onClick={close}/>
        </Header>
        <Content>
          <Textfield
            placeholder={'Gallery Name'}
            name={'name'}
            value={name}
            onChange={this.changeName}
          />
          <Textarea
            placeholder={'Gallery Description'}
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

const UPDATE_GALLERY = gql`
  mutation updateGallery($id: String!, $name: String!, $description: String) {
    updateGallery(id: $id, name: $name, description: $description) {
      id
      name
      slug
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

export default compose(
  graphql(UPDATE_GALLERY, {
    name: 'updateGallery',
  }),
)(EditGallery)
