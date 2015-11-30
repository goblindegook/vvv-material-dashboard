import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'
import About from './containers/About'
import App from './containers/App'
import Sites from './containers/Sites'

const routes = (
  <Route component={App}>
    <Redirect from='/' to='/sites' />
    <Route path='/sites' component={Sites} />
    <Route path='/about' component={About} />
    <IndexRoute component={Sites}/>
  </Route>
)

export default routes
