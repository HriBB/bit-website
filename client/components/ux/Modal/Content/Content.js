import React, { Component, PropTypes } from 'react'

import './Content.scss'

const Content = props => {
  const { children } = props
  return (
    <div className={'modal-content'}>
      {children}
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Content
