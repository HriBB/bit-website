import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './Admin.scss'

const Admin = props => {
  const { children } = props
  return (
    <div className={'bit-admin'}>
      {children}
    </div>
  )
}

Admin.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Admin
