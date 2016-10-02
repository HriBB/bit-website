import React, { Component, PropTypes } from 'react'

import './Error.scss'

import { Layout, Content, Header, Title } from 'components/ux/Layout'

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
