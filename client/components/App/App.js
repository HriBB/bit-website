import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import cn from 'classnames'

import 'normalize.css'
import './App.scss'

const App = props => {
  const { children, routes } = props
  const active = routes[1].path
  return (
    <div className={'bit-app'}>
      <div className={'bit-app-header'}>
        <h1><Link to={'/'}>BIT</Link></h1>
        <ul>
          <li><Link className={cn({ active: active === '/' })} to={'/'}>Home</Link></li>
          <li><Link className={cn({ active: active === 'about' })} to={'/about'}>About</Link></li>
          <li><Link className={cn('logo', { active: active === '/' })} to={'/'}>BIT</Link></li>
          <li><Link className={cn({ active: active === 'gallery' })} to={'/gallery'}>Gallery</Link></li>
          <li><Link className={cn({ active: active === 'shop' })} to={'/shop'}>Shop</Link></li>
        </ul>
      </div>
      <div className={'bit-app-content'}>
        {children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.any.isRequired,
}

export default App
