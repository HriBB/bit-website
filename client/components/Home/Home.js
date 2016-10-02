import React, { Component, PropTypes } from 'react'

import {
  Layout,
  Header,
  Content,
  Title,
} from 'components/ux'

import './Home.scss'

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
