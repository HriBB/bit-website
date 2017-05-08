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
  Uploadfield,
} from 'components/ux'

import './AddGallery.scss'

class AddGallery extends Component {

  static propTypes = {
    close: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
    }
  }

  save = () => {
    const { createGallery, close } = this.props
    const { name, description } = this.state
    createGallery({ variables: { name, description } })
      .then(({ data }) => {
        //console.log('createGallery success', data);
        close();
      }).catch((error) => {
        //console.log('createGallery error', error);
      });
  }

  changeName = (e) => {
    this.setState({ name: e.target.value })
  }

  changeDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  render() {
    const { close } = this.props
    const { name, description } = this.state
    return (
      <Layout>
        <Header third dark>
          <Title flex>Add Gallery</Title>
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
        </Content>
        <Footer>
          <Button onClick={this.save}>Save</Button>
        </Footer>
      </Layout>
    )
  }

}

const CREATE_GALLERY = gql`
  mutation createGallery($name: String!, $description: String) {
    createGallery(name: $name, description: $description) {
      id
      slug
      name
      description
      image {
        id
      }
    }
  }`

export default compose(
  graphql(CREATE_GALLERY, {
    name: 'createGallery',
    options: {
      updateQueries: {
        galleries: (prev, { mutationResult, queryVariables }) => {
          return {
            galleries: [...prev.galleries, mutationResult.data.createGallery],
          }
        },
      },
    },
  }),
)(AddGallery)
