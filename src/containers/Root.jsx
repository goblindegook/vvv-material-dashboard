import React from 'react'
import { Router, Route } from 'react-router'
import { ReduxRouter } from 'redux-router'
import routes from '../routes'

const Root = () => (
  <ReduxRouter>
    {routes}
  </ReduxRouter>
)

export default Root
