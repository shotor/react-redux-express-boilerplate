/**
 * routes.js
 * Contains the routing configuration
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

// common components
import AppContainer from 'containers/app';
import About from 'components/about'
import NotFound from 'components/not-found'

// view components
import HomeContainer from 'containers/home'
import DifferentPageContainer from 'containers/different-page/different-page-container'

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer}/>
    <Route path="about" component={About}/>
    <Route path="different" component={DifferentPageContainer} />
    <Route path="*" component={NotFound}/>
  </Route>
)
