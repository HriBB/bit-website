import React from 'react'
import { Route } from 'react-router'

import App from 'components/App'
import Home from 'components/Home'
import Shop from 'components/Shop'
import About from 'components/About'
import Gallery from 'components/Gallery'
import GalleryList from 'components/Gallery/GalleryList'
import GalleryView from 'components/Gallery/GalleryView'
import NotFound from 'components/NotFound'

export default {
  component: App,
  childRoutes: [{
    path: '/',
    component: Home,
  },{
    path: 'about',
    component: About,
  },{
    path: 'gallery',
    component: Gallery,
    indexRoute: {
      component: GalleryList,
    },
    childRoutes: [{
      path: ':gallery',
      component: GalleryView,
      childRoutes: [{
        path: ':image',
        component: GalleryView,
      }],
    }],
  },{
    path: 'shop',
    component: Shop,
  },{
    path: '*',
    component: NotFound,
  }]
}
