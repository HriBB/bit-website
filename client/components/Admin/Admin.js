import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const Admin = props => props.children

Admin.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Admin
