import { routerStateReducer } from 'redux-router'
import sites from './sites.js'
import services from './services.js'

export default {
  router: routerStateReducer,
  sites,
  services,
}
