import React, { Component, PropTypes } from 'react'

import './Shop.scss'

import Content from 'components/ux/Content'
import Title from 'components/ux/Title'

const Shop = props => {
  const { children } = props
  return (
    <Content className={'bit-admin-shop'}>
      <Title>Shop</Title>
    </Content>
  )
}

Shop.propTypes = {
}

export default Shop
