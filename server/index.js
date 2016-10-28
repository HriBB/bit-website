import { async, await } from 'asyncawait'
import Koa from 'koa'
import logger from 'koa-logger'
import body from 'koa-bodyparser'
import serve from 'koa-static'
import mount from 'koa-mount'
import send from 'koa-send'
import cors from 'kcors'
import { get, post } from 'koa-route'

import config from '../config'
import { createGraphQLServer } from './graphql'
//import { renderReactApp } from './utils/react'

const app = new Koa()

// use cors
app.use(cors());

// use logger
app.use(logger())

// use body parser
app.use(body({ enableTypes: ['json'] }))

// create graphql server
createGraphQLServer(app)

// serve static
app.use(mount('/static', serve(config.static.path)))

// serve static
app.use(mount('/images', serve(config.upload.path)))

// serve bit script
app.use(async (ctx, next) => {
  const path = ctx.path.split('?')[0]
  if (path !== '/bit.js') return next()
  return await send(ctx, path, { root: config.dist.path })
})

// serve bit styles
app.use(async (ctx, next) => {
  const path = ctx.path.split('?')[0]
  if (path !== '/bit.css') return next()
  return await send(ctx, path, { root: config.dist.path })
})

/*
// render react app
if (__PROD__) {
  app.use(renderReactApp)
}
*/

// error handler
app.on('error', (err) => console.log('==> ERROR', err))

// start http server
app.listen(config.server.port);
console.log('==> BIT server running on', config.server.url)
