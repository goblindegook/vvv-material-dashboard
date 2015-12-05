import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const ActionTypes = {
  REQUEST_SERVICE_STATUS:       'REQUEST_SERVICE_STATUS',
  RECEIVE_SERVICE_STATUS:       'RECEIVE_SERVICE_STATUS',
  RECEIVE_SERVICE_STATUS_ERROR: 'RECEIVE_SERVICE_STATUS_ERROR',
}

export function requestServiceStatus() {
  return {
    type: ActionTypes.REQUEST_SERVICE_STATUS,
  }
}

export function receiveServiceStatus(services) {
  return {
    type:    ActionTypes.RECEIVE_SERVICE_STATUS,
    payload: { services },
  }
}

export function receiveServiceStatusError(error) {
  return {
    type:    ActionTypes.RECEIVE_SERVICE_STATUS_ERROR,
    payload: error,
    error:   true,
  }
}

export function getServiceStatus(service = '') {
  return async dispatch => {
    const url = 'http://vvv/api/v1/services' + (service ? '/' + encodeURIComponent(service) : '')

    dispatch(requestServiceStatus())

    try {
      const response = await fetch(url)
      const services = await response.json()
      dispatch(receiveServiceStatus(services))
    } catch(error) {
      dispatch(receiveServiceStatusError(error))
    }
  }
}

export function setServiceStatus(service = '', status = '') {
  if (!service || !status) {
    return
  }

  return async dispatch => {
    const url = 'http://vvv/api/v1/services/' + encodeURIComponent(service) + '/' + encodeURIComponent(status)

    dispatch(requestServiceStatus())

    try {
      const response = await fetch(url, {method: 'put'})
      const services = await response.json()
      dispatch(receiveServiceStatus(services))
    } catch(error) {
      dispatch(receiveServiceStatusError(error))
    }
  }
}
