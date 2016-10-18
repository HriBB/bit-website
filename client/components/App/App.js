import React, { Component, PropTypes } from 'react'
import { Link, Match, Miss } from 'react-router'
import cn from 'classnames'

import 'normalize.css'
import './App.scss'

import Home from 'components/Home'
import Shop from 'components/Shop'
import About from 'components/About'
import Gallery from 'components/Gallery'
import NotFound from 'components/NotFound'

const App = props => {
  const { location: { pathname } } = props
  const active = pathname.split('/')[1] || 'home'
  return (
    <div className={'bit-app'}>
      <div className={'bit-app-header'}>
        <h1><Link to={'/'}>BIT</Link></h1>
        <ul>
          {/*<li><Link className={cn({ active: active === '/' })} to={'/'}>Home</Link></li>*/}
          <li><Link className={cn({ active: active === 'about' })} to={'/about'}>About</Link></li>
          <li><Link className={cn('logo', { active: active === 'home' })} to={'/'}>BIT</Link></li>
          <li><Link className={cn({ active: active === 'gallery' })} to={'/gallery'}>Gallery</Link></li>
          {/*<li><Link className={cn({ active: active === 'shop' })} to={'/shop'}>Shop</Link></li>*/}
        </ul>
      </div>
      <div className={'bit-app-content'}>
        <Match exactly pattern={'/'} component={Home} />
        <Match pattern={'/about'} component={About} />
        <Match pattern={'/gallery'} component={Gallery} />
        <Match pattern={'/shop'} component={Shop} />
        <Miss component={NotFound} />
      </div>
    </div>
  )
}

export default App
