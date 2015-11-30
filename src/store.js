import { Iterable } from 'immutable'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { reduxReactRouter } from 'redux-router'
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import routes from './routes'
import reducers from './reducers'

const app = combineReducers(reducers)

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    createHistory: createHashHistory,
    routes,
  })
)(createStore)(app)

export default store
