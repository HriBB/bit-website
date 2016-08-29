import React, { Component, PropTypes } from 'react'

import './Home.scss'

const Home = props => {
  const { children } = props
  return (
    <div className={'bit-admin-home'}>
      <h1>Wellcome to BIT admin!</h1>
    </div>
  )
}

Home.propTypes = {
}

export default Home
