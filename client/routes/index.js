import React from 'react'
import { Route } from 'react-router'

import App from 'components/App'
import Home from 'components/Home'
import About from 'components/About'
import Gallery from 'components/Gallery'
import Shop from 'components/Shop'

import Admin from 'components/Admin'
import AdminHome from 'components/Admin/Home'
import AdminAbout from 'components/Admin/About'
import AdminGallery from 'components/Admin/Gallery'
import AdminGalleryList from 'components/Admin/Gallery/GalleryList'
import AdminGalleryView from 'components/Admin/Gallery/GalleryView'
import AdminShop from 'components/Admin/Shop'

import NotFound from 'components/NotFound'

const publicRoutes = [{
  path: '/',
  component: Home
},{
  path: 'about',
  component: About
},{
  path: 'gallery',
  component: Gallery
},{
  path: 'shop',
  component: Shop
}]

const adminRoutes = [{
  path: 'admin',
  component: Admin,
  indexRoute: {
    component: AdminHome
  },
  childRoutes: [{
    path: 'gallery',
    component: AdminGallery,
    indexRoute: {
      component: AdminGalleryList
    },
    childRoutes: [{
      path: ':slug',
      component: AdminGalleryView
    }]
  },{
    path: 'shop',
    component: AdminShop
  },{
    path: 'about',
    component: AdminAbout
  }]
}]

const routes = {
  component: App,
  childRoutes: [
    ...publicRoutes,
    ...adminRoutes,
    { path: '*', component: NotFound }
  ]
}

export default routes
