import { routerStateReducer } from 'redux-router'
import sites from './sites.js'
import status from './status.js'

export default {
  router: routerStateReducer,
  sites,
  status,
}
