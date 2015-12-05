import Immutable from 'immutable'
import { ActionTypes } from '../actions/services'

const initialState = Immutable.fromJS({
  isWaiting: false,
  services: {},
})

function services(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.REQUEST_SERVICE_STATUS:
      return state.merge({
        isWaiting: true,
      })

    case ActionTypes.RECEIVE_SERVICE_STATUS:
      return state.mergeDeep({
        ...action.payload,
        isWaiting: false,
      })

    case ActionTypes.RECEIVE_SERVICE_STATUS_ERROR:
      return state.merge({
        ...action.payload,
        isWaiting: false,
      })

    default:
      return state
  }
}

export default services
