import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Modal from 'components/ux/Modal'
import Button from 'components/ux/Button'
import AddAlbum from './AddAlbum'

import './Admin.scss'

class Admin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addAlbum: false,
      editAlbum: false,
    }
    this.addAlbum = this.addAlbum.bind(this)
    this.editAlbum = this.editAlbum.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  addAlbum() {
    this.setState({ addAlbum: true })
  }

  editAlbum(album) {
    this.setState({ editAlbum: album })
  }

  closeModal() {
    this.setState({ addAlbum: false, editAlbum: false })
  }

  render() {
    const { addAlbum, editAlbum } = this.state
    return (
      <div className={'bit-admin'}>
        <h1>Admin</h1>
        <Button onClick={this.addAlbum}>Add album</Button>

        {addAlbum &&
          <Modal isOpen onRequestClose={this.closeModal}>
            <AddAlbum />
          </Modal>}

      </div>
    )
  }

}

export default Admin

/*
const GET_ALBUMS = gql`
  query albums {
    albums {
      id
      name
      slug
      description
      images {
        id
        name
        slug
        description
      }
    }
  }
`

const withData = graphql(GET_ALBUMS)
const AdminWithData = withData(Admin)

export default AdminWithData
*/
