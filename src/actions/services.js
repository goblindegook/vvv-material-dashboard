import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const ActionTypes = {
  REQUEST_STATUS:       'REQUEST_STATUS',
  RECEIVE_STATUS:       'RECEIVE_STATUS',
  RECEIVE_STATUS_ERROR: 'RECEIVE_STATUS_ERROR',
}

export function requestStatus() {
  return {
    type: ActionTypes.REQUEST_STATUS,
  }
}

export function receiveStatus(services) {
  return {
    type:    ActionTypes.RECEIVE_STATUS,
    payload: { services },
  }
}

export function receiveStatusError(error) {
  return {
    type:    ActionTypes.RECEIVE_STATUS_ERROR,
    payload: error,
    error:   true,
  }
}

export function getStatus(service = '') {
  return async dispatch => {
    const url = 'http://vvv/api/v1/services' + (service ? '/' + encodeURIComponent(service) : '')

    dispatch(requestStatus())

    try {
      const response = await fetch(url)
      const services = await response.json()
      dispatch(receiveStatus(services))
    } catch(error) {
      dispatch(receiveStatusError(error))
    }
  }
}

export function setStatus(service = '', status = '') {
  if (!service || !status) {
    return
  }

  return async dispatch => {
    const url = 'http://vvv/api/v1/services/' + encodeURIComponent(service) + '/' + encodeURIComponent(status)

    dispatch(requestStatus())

    try {
      const response = await fetch(url, {method: 'put'})
      const services = await response.json()
      dispatch(receiveStatus(services))
    } catch(error) {
      dispatch(receiveStatusError(error))
    }
  }
}
