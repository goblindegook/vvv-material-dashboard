import React from 'react'
import { Router, Route } from 'react-router'
import { ReduxRouter } from 'redux-router'
import DevTools from './DevTools'
import routes from '../routes'

const Root = () => (
  <div>
    <ReduxRouter>
      {routes}
    </ReduxRouter>
    <DevTools />
  </div>
)

export default Root
