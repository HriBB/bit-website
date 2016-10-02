import React, { Component, PropTypes } from 'react'

import './NotFound.scss'

import { Layout, Content, Header, Title } from 'components/ux/Layout'

export default class NotFound extends Component {

  render() {
    return (
      <Layout className={'bit-404'}>
        <Header>
          <Title center>Error</Title>
        </Header>
        <Content>
          Page not found!
        </Content>
      </Layout>
    )
  }

}
