import React, { Component, PropTypes } from 'react'

import './About.scss'

import {
  Layout,
  Header,
  Content,
  Title,
  Paragraph,
  IconLink,
} from 'components/ux'

export default class About extends Component {

  render() {
    return (
      <Layout className={'bit-about'} centered>
        <Header>
          <IconLink to={'/'} name={'navigate_before'}/>
          <Title>About</Title>
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
