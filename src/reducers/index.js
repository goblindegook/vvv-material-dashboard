import { routeReducer } from 'redux-simple-router'
import app from './app.js'
import sites from './sites.js'
import services from './services.js'

export default {
  routing: routeReducer,
  app,
  sites,
  services,
}
