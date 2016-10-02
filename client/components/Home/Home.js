import React, { Component, PropTypes } from 'react'

import './Home.scss'

import { Layout, Header, Content, Title } from 'components/ux/Layout'

export default class Home extends Component {
  render() {
    return (
      <Layout centered className={'bit-home'}>
        <Content>
          <img src={require('./logo.png')} alt={'BIT Clothes'}/>
        </Content>
      </Layout>
    )
  }
}
