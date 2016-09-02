import React, { Component, PropTypes } from 'react'

import './Home.scss'

import Content from 'components/ux/Content'
import Title from 'components/ux/Title'

const Home = props => {
  const { children } = props
  return (
    <Content className={'bit-admin-home'}>
      <Title>Wellcome to BIT admin!</Title>
    </Content>
  )
}

Home.propTypes = {
}

export default Home
