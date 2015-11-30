import 'babel-polyfill'
import './styles'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import Root from './containers/Root'

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
