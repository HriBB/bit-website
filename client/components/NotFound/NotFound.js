import React, { Component, PropTypes } from 'react'

import {
  Layout,
  Content,
  Header,
  Title,
} from 'components/ux'

import './NotFound.scss'

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
