import { Iterable } from 'immutable'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistory } from 'redux-simple-router'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(syncHistory(hashHistory))
  )
)

export default store
