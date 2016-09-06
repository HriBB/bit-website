import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Body, Header, Content, Footer, Title, Close } from 'components/ux/Modal'
import Uploadfield from 'components/ux/Uploadfield'
import Textfield from 'components/ux/Textfield'
import Textarea from 'components/ux/Textarea'
import Button from 'components/ux/Button'

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
      error: 'Some error',
    }
    this.save = this.save.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
  }

  save() {
    const { gallery, updateGallery, close } = this.props
    const { name, description } = this.state
    const { id, slug } = gallery
    updateGallery({ variables: { id, name, description } })
      .then(({ data: { updateGallery } }) => {
        close()
        if (updateGallery.slug !== slug) {
          this.context.router.push(`/admin/gallery/${updateGallery.slug}`)
        }
      }).catch(error => {
        this.setState({ error: error.message })
      })
  }

  changeName(e) {
    this.setState({ name: e.target.value })
  }

  changeDescription(e) {
    this.setState({ description: e.target.value })
  }

  render() {
    const { close } = this.props
    const { name, description, error } = this.state
    return (
      <Body>
        <Header>
          <Title>Edit Gallery</Title>
          <Close onClick={close}/>
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
      </Body>
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

const withUpdateGallery = graphql(UPDATE_GALLERY, {
  name: 'updateGallery',
})

export default withUpdateGallery(EditGallery)
