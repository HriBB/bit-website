import React, { Component, PropTypes } from 'react'

import './Shop.scss'

import { Layout, Header, Content, Title } from 'components/ux/Layout'

export default class Shop extends Component {

  render() {
    return (
      <Layout centered className={'bit-shop'}>
        <Header centered>
          <Title>Shop</Title>
        </Header>
        <Content>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Content>
      </Layout>
    )
  }

}
