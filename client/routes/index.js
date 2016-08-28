import React from 'react'
import { Route } from 'react-router'

import App from 'components/App'
import Admin from 'components/Admin'
import About from 'components/About'
import Gallery from 'components/Gallery'
import Home from 'components/Home'
import Shop from 'components/Shop'
import NotFound from 'components/NotFound'

export default {
  component: App,
  childRoutes: [
    { path: '/', component: Home },
    { path: 'gallery', component: Gallery },
    { path: 'shop', component: Shop },
    { path: 'about', component: About },
    { path: 'bitt', component: Admin },
    { path: '*', component: NotFound },
  ]
}
