import { Iterable } from 'immutable'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistory } from 'redux-simple-router'
import thunk from 'redux-thunk'
import reducers from './reducers'

const app = combineReducers(reducers)

const reduxRouterMiddleware = syncHistory(hashHistory)

const store = compose(
  applyMiddleware(thunk),
  applyMiddleware(reduxRouterMiddleware)
)(createStore)(app)

export default store
