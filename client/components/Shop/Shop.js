import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Layout,
  Header,
  Content,
  Title,
  Paragraph,
  IconLink,
} from 'components/ux'

import './Shop.scss'

export default class Shop extends Component {

  render() {
    return (
      <Layout centered className={'bit-shop'}>
        <Header>
          <IconLink to={'/'} name={'navigate_before'}/>
          <Title>Shop</Title>
        </Header>
        <Content>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt anim id est laborum.
          </Paragraph>
        </Content>
      </Layout>
    )
  }

}
