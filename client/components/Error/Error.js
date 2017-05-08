import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Layout,
  Content,
  Header,
  Title,
} from 'components/ux'

import './Error.scss'

export default class Error extends Component {

  render() {
    return (
      <Layout className={'bit-error'} centered>
        <Header>
          <Title>Error</Title>
        </Header>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }

}
