import Immutable from 'immutable'
import { ActionTypes } from '../actions/status'

const initialState = Immutable.fromJS({
  isLoading: false,
  services: {},
})

function status(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.REQUEST_STATUS:
      return state.merge({
        isLoading: true,
      })

    case ActionTypes.RECEIVE_STATUS:
      return state.mergeDeep({
        ...action.payload,
        isLoading: false,
      })

    case ActionTypes.RECEIVE_STATUS_ERROR:
      return state.merge({
        ...action.payload,
        isLoading: false,
      })

    default:
      return state
  }
}

export default status
