import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

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
          <Link to={'/about'}>
            <img src={require('./logo.png')} alt={'BIT Clothes'}/>
          </Link>
        </Content>
      </Layout>
    )
  }
}
