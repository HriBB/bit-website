import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Body, Header, Content, Footer, Title, Close } from 'components/ux/Modal'
import Textfield from 'components/ux/Textfield'
import Textarea from 'components/ux/Textarea'
import Button from 'components/ux/Button'

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
    this.save = this.save.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
  }

  save() {
    const { image, updateImage, close } = this.props
    const { name, description } = this.state
    const { id, slug } = image
    updateImage({ variables: { id, name, description } })
      .then(({ data: { updateImage } }) => {
        console.log({updateImage});
        return
        close()
        if (updateImage.slug !== slug) {
          this.context.router.push(`/admin/gallery/${updateImage.slug}`)
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
          <Title>Edit Image</Title>
          <Close onClick={close}/>
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
      </Body>
    )
  }

}

const UPDATE_IMAGE = gql`
  mutation updateImage($id: String!, $name: String!, $description: String) {
    updateImage(id: $id, name: $name, description: $description) {
      id
      name
      slug
      description
    }
  }
`

const withUpdateImage = graphql(UPDATE_IMAGE, {
  name: 'updateImage',
})

export default withUpdateImage(EditImage)