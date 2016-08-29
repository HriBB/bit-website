import React, { Component, PropTypes } from 'react'

import './About.scss'

const About = props => {
  const { children } = props
  return (
    <div className={'bit-admin-about'}>
      <h1>About</h1>
    </div>
  )
}

About.propTypes = {
}

export default About
