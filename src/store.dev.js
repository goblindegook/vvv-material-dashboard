import { Iterable } from 'immutable'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { reduxReactRouter } from 'redux-router'
import { createHashHistory } from 'history'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import routes from './routes'
import reducers from './reducers'
import DevTools from './containers/DevTools';

const app = combineReducers(reducers)

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    createHistory: createHashHistory,
    routes,
  }),
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)(app)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
