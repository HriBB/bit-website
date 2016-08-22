import async from 'asyncawait/async'
import await from 'asyncawait/await'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import routes from '../../client/routes'

export async function renderReactApp(ctx, next) {

  match({ routes, location: ctx.request.url }, async (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.status = 500
      ctx.body = error.message
    } else if (redirectLocation) {
      ctx.status = 302
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      ctx.status = renderProps.components[1].name === 'NotFound' ? 400 : 200
      // await fetchComponentData(renderProps)
      ctx.body = renderToString(<RouterContext {...renderProps} />)
    } else {
      ctx.status = 404
      ctx.body = 'Not fount!'
    }
  })

  /*
  try {
    console.info('==> Render react application:', req.url)

    // get auth token
    const token = req.cookies.token

    // get mobile flag
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers['user-agent'])

    // set initial redux state
    const initialState = {
      device: { mobile },
      user: { token },
    }

    // create redux router
    const router = reduxReactRouter({ getRoutes, createHistory })

    // create redux store
    const store = configureStore(router, initialState)

    // extract dispatch
    const { dispatch } = store

    // authenticate user if neccessary
    if (token) await dispatch(fetchProfile())

    // run redux router
    dispatch(match(req.url, async (error, redirectLocation, renderProps) => {

      // errors
      if (error) return res.status(500).end('Internal server error')

      // redirect
      if (redirectLocation) return res.status(301).redirect(redirectLocation.pathname)

      // not found
      if (!renderProps) return res.status(404).end('Not found')

      // extract components and params
      const { components, params } = renderProps

      // fetch data from rendered components
      await fetchComponentData(store.dispatch, renderProps.components, renderProps.params)

      // create material-ui theme for server rendering
      const muiTheme = getMuiTheme({}, {
        userAgent: req.headers['user-agent'],
      })

      // Render react app to string
      const content = renderToString(
        <Provider store={store}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <ReduxRouter {...renderProps}/>
          </MuiThemeProvider>
        </Provider>
      )

      // prepare template for router middleware
      const template = resolve(__dirname, '..', '..', 'dist', 'index.html')
      const html = readFileSync(template, 'utf-8')
        .replace('<div id="root"></div>', '<div id="root">${content}</div><script>window.__INITIAL_STATE__ = ${data}</script>')
        .replace('${content}', content)
        .replace('${data}', JSON.stringify(store.getState()))

      // houston we got html!
      res.end(html)
    }))

  } catch (error) {
    return res.status(404).end(error.message)
  }
  */
}
