import Immutable from 'immutable'
import { ActionTypes } from '../actions/sites'

const initialState = Immutable.fromJS({
  isLoading: false,
  query:     null,
  sites:     [],
})

function sites(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.REQUEST_SITES:
      return state.merge({
        isLoading: true,
        sites:     [],
      })

    case ActionTypes.RECEIVE_SITES:
      return state.merge({
        ...action.payload,
        isLoading: false,
      })

    case ActionTypes.RECEIVE_SITES_ERROR:
      return state.merge({
        ...action.payload,
        isLoading: false,
        sites:     [],
      })

    case ActionTypes.SEARCH_SITES:
      return state.merge({
        ...action.payload,
      })

    default:
      return state
  }
}

export default sites
