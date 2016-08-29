import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import 'normalize.css'
import './App.scss'

const App = props => {
  const { children, routes } = props
  const className = classnames({
    'bit': true,
    'bit--fullscreen': false,
    'bit--mobile': false,
  })
  const admin = routes[1].path === 'admin'
  const active = (admin ? routes[2].path : routes[1].path) || 'home'
  return (
    <div className={className}>
      <div className={'bit-header'}>
        <h1><Link to={'/'}>BIT</Link></h1>
        {!admin &&
          <ul>
            <li><Link className={active === 'home' ? 'active' : ''} to={'/'}>Home</Link></li>
            <li><Link className={active === 'about' ? 'active' : ''} to={'/about'}>About</Link></li>
            <li><Link className={'logo'} to={'/'}>BIT</Link></li>
            <li><Link className={active === 'gallery' ? 'active' : ''} to={'/gallery'}>Gallery</Link></li>
            <li><Link className={active === 'shop' ? 'active' : ''} to={'/shop'}>Shop</Link></li>
          </ul>}
        {admin &&
          <ul>
            <li><Link className={active === 'home' ? 'active' : ''} to={'/admin'}>Home</Link></li>
            <li><Link className={active === 'about' ? 'active' : ''} to={'/admin/about'}>About</Link></li>
            <li><Link className={'logo'} to={'/'}>BIT<span>ADMIN</span></Link></li>
            <li><Link className={active === 'gallery' ? 'active' : ''} to={'/admin/gallery'}>Gallery</Link></li>
            <li><Link className={active === 'shop' ? 'active' : ''} to={'/admin/shop'}>Shop</Link></li>
          </ul>}
      </div>
      <div className={'bit-content'}>
        {children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.any.isRequired,
}

export default App
