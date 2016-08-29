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

  constructor(props) {
    super(props)
    this.state = {
      name: 'New Gallery',
      description: 'Gallery description',
    }
    this.save = this.save.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
  }

  save() {
    const { updateGallery } = this.props
    const { name, description } = this.state
    updateGallery({ variables: { id, name, description } })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  changeName(e) {
    this.setState({ name: e.target.value })
  }

  changeDescription(e) {
    this.setState({ description: e.target.value })
  }

  render() {
    const { close } = this.props
    const { name, description } = this.state
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
  options: {
    updateQueries: {
      galleries: (prev, { mutationResult, queryVariables }) => {
        return {
          galleries: [...prev.galleries, mutationResult.data.updateGallery],
        }
      }
    }
  }
})

export default withUpdateGallery(EditGallery)
