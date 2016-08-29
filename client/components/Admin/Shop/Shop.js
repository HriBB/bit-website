import React, { Component, PropTypes } from 'react'

import './Shop.scss'

const Shop = props => {
  const { children } = props
  return (
    <div className={'bit-admin-shop'}>
      <h1>Shop</h1>
    </div>
  )
}

Shop.propTypes = {
}

export default Shop
