import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Body, Header, Content, Footer, Title, Close } from 'components/ux/Modal'
import Textfield from 'components/ux/Textfield'
import Textarea from 'components/ux/Textarea'
import Button from 'components/ux/Button'

import './AddAlbum.scss'

class AddAlbum extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
    }
    this.save = this.save.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
  }

  save() {
    const { mutate } = this.props
    const { name, description } = this.state
    mutate({ variables: { name, description } })
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
    const { name, description } = this.state
    return (
      <Body>
        <Header>
          <Title>Add Album</Title>
          <Close/>
        </Header>
        <Content>
          <Textfield
            placeholder={'Album Name'}
            name={'name'}
            value={name}
            onChange={this.changeName}
          />
          <Textarea
            placeholder={'Album Description'}
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

const CREATE_ALBUM = gql`
  mutation createAlbum($name: String!, $description: String) {
    createAlbum(name: $name, description: $description) {
      id
      name
      slug
      description
    }
  }
`;

const withData = graphql(CREATE_ALBUM)
const AddAlbumWithData = withData(AddAlbum)

export default AddAlbumWithData
