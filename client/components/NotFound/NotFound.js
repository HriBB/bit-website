import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <Layout className={'bit-404'} centered>
        <Header>
          <Title>Error</Title>
        </Header>
        <Content>
          Page not found!
        </Content>
      </Layout>
    )
  }

}
