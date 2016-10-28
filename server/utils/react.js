import { async, await } from 'asyncawait'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import config from 'config'
import routes from 'routes'

export async function renderReactApp(ctx, next) {

  match({ routes, location: ctx.request.url }, async (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.status = 500
      ctx.body = error.message
    } else if (redirectLocation) {
      ctx.status = 302
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const template = readFileSync(resolve(config.dist.path, 'index.html'), 'utf-8')
      const content = renderToString(<RouterContext {...renderProps} />)
      const html = template.replace('<div id="bit"></div>', `<div id="bit">${content}</div>`)
      ctx.status = renderProps.components[1].name === 'NotFound' ? 400 : 200
      ctx.body = html
    } else {
      ctx.status = 404
      ctx.body = 'Not found!'
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

export function fetchComponentData(dispatch, components, params) {
  let actions = [];
  components.forEach(component => {
    let needs = component.needs || (component.WrappedComponent && component.WrappedComponent.needs)
    if (needs && needs.length) {
      needs.forEach(action => {
        if (actions.indexOf(action) === -1) {
          actions.push(action)
        }
      })
    }
  })
  const promises = actions.map(action => dispatch(action(params)))
  return Promise.all(promises)
}
