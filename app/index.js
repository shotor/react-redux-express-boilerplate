/*import React from 'react'
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

/*
     <Router
        history={history}
        render={applyRouterMiddleware(useScroll())}
      >
        {routes}
      </Router>
*/


/*const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {routes()}
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()*/

//Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('containers/app', () => {
//     render()
//   })
// }


import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

import Root from './root';
import configureStore from 'store/configure-store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Get the DOM Element that will host our React application
const rootEl = document.getElementById('root');

// Render the React application to the DOM
render(
  <AppContainer errorReporter={Redbox}>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
   const orgError = console.error; // eslint-disable-line no-console
   console.error = (message) => { // eslint-disable-line no-console
     if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
       // Log the error as normally
       orgError.apply(console, [message]);
     }
   };

  module.hot.accept('./Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./Root').default;

    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp store={store} history={history} />
      </AppContainer>,
      rootEl
    );
  });
}