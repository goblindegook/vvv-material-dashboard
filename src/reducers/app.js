import Immutable from 'immutable'
import { ActionTypes } from '../actions/app'

const initialState = Immutable.fromJS({
  height: window.innerHeight,
  width:  window.innerWidth,
})

function app(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.RESIZE_WINDOW:
      return state.mergeDeep(action.payload)

    default:
      return state
  }
}

export default app
