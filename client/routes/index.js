import React from 'react'
import { Route } from 'react-router'

import App from 'components/App'
import Home from 'components/Home'
import Gallery from 'components/Gallery'
import About from 'components/About'
import NotFound from 'components/NotFound'

export default {
  component: App,
  childRoutes: [
    { path: '/', component: Home },
    { path: 'gallery', component: Gallery },
    { path: 'about', component: About },
    { path: '*', component: NotFound },
  ]
}
