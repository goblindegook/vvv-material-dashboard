import { routeReducer } from 'react-router-redux'
import app from './app.js'
import sites from './sites.js'
import services from './services.js'

export default {
  routing: routeReducer,
  app,
  sites,
  services,
}
