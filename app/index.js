import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll';
import routes from './routes'
import configure_store from 'store/configure-store'
import { syncHistoryWithStore } from 'react-router-redux'

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'

import App from 'containers/app';

const initial_state = {
  users: [],
  products: [],
  customers: []
}
const store = configure_store(initial_state)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)



const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router
          history={history}
          render={applyRouterMiddleware(useScroll())}
        >
          {routes}
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/app.js', () => {
    render()
  })
}