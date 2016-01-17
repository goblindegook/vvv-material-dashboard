import 'babel-polyfill'
import './styles'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, IndexRoute, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import DevTools from './components/DevTools'
import App from './containers/App'
import About from './containers/About'
import Sites from './containers/Sites'

injectTapEventPlugin()

render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Redirect from='/' to='/sites' />
          <Route path='sites' component={Sites} />
          <Route path='about' component={About} />
          <IndexRoute component={Sites}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
