import { Iterable } from 'immutable'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistory } from 'redux-simple-router'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import reducers from './reducers'
import DevTools from './components/DevTools';

const app = combineReducers(reducers)

const reduxRouterMiddleware = syncHistory(hashHistory)

const store = compose(
  applyMiddleware(thunk),
  applyMiddleware(reduxRouterMiddleware),
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)(app)

reduxRouterMiddleware.listenForReplays(store)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
