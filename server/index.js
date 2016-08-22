import async from 'asyncawait/async'
import await from 'asyncawait/await'
//import { readFileSync } from 'fs'
import { resolve } from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import body from 'koa-bodyparser'
import serve from 'koa-static'
import send from 'koa-send'
import { get, post } from 'koa-route'

import config from '../config'
import { renderReactApp } from './utils/renderReactApp'

const app = new Koa()

// use logger
app.use(logger())

// use body parser
app.use(body())

// serve favicon
//app.use(favicon(resolve(__dirname, '..', 'static', 'favicon.png')))

// create apollo graphql server
//createGraphQL(app)

// create public climbuddy rest api
//createPublicApi(app)

// serve static
app.use(serve(config.static.path))

// serve bit script
app.use(async (ctx, next) => {
  const path = ctx.path.split('?')[0]
  if (path !== '/bit.js') return next()
  return await send(ctx, path, { root: config.dist.path })
})


// serve bin styles
app.use(async (ctx, next) => {
  const path = ctx.path.split('?')[0]
  if (path !== '/bit.css') return next()
  return await send(ctx, path, { root: config.dist.path })
})

// render react app
app.use(renderReactApp)

// anything after this will be protected by jwt token
//app.use(jwt({ secret: config.token.secret }))

// error handler
app.on('error', (err) => console.log('==> Error', err))

// start http server
app.listen(config.server.port);
console.log('==> BIT server running on', config.server.url)