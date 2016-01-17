import { routeReducer } from 'redux-simple-router'
import sites from './sites.js'
import services from './services.js'

export default {
  routing: routeReducer,
  sites,
  services,
}
