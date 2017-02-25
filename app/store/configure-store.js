/**
 * configureStore.js
 *
 * This file configures the store for hot reloading.
 * This boilerplate file is likely to be the same for each project that uses Redux.
 * The actual stores are in /reducers.
 *
 */

import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

const routingMiddleware = routerMiddleware(browserHistory)

// use enhancer to add plugin middleware
const enhancer = compose(
  applyMiddleware(thunk),
  applyMiddleware(routingMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default function configureStore(initialState) {

  const store = createStore(
    rootReducer, 
    initialState, 
    enhancer)

  // enable hot reloading of reducers
  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers'))
  //   )
  // }

  return store
}
