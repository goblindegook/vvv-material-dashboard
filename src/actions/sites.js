import fetch from 'isomorphic-fetch'

export const ActionTypes = {
  REQUEST_SITES:       'REQUEST_SITES',
  RECEIVE_SITES:       'RECEIVE_SITES',
  RECEIVE_SITES_ERROR: 'RECEIVE_SITES_ERROR',
  SEARCH_SITES:        'SEARCH_SITES',
}

export function requestSites() {
  return {
    type: ActionTypes.REQUEST_SITES,
  }
}

export function receiveSites(sites) {
  return {
    type:    ActionTypes.RECEIVE_SITES,
    payload: { sites },
  }
}

export function receiveSitesError(error) {
  return {
    type:    ActionTypes.RECEIVE_SITES_ERROR,
    payload: error,
    error:   true,
  }
}

export function searchSites(query) {
  return {
    type:    ActionTypes.SEARCH_SITES,
    payload: { query },
  }
}

export function fetchSites() {
  return async dispatch => {
    dispatch(requestSites())

    try {
      const response = await fetch('http://vvv/api/v1/sites')
      const sites    = await response.json()
      dispatch(receiveSites(sites))
    } catch(error) {
      dispatch(receiveSitesError(error))
    }
  }
}
