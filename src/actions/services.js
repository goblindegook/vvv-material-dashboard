import fetch from 'isomorphic-fetch'

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

export function receiveServiceStatus(serviceList) {
  return {
    type:    ActionTypes.RECEIVE_SERVICE_STATUS,
    payload: { serviceList },
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
    const url = '//vvv/api/v1/services' + (service ? '/' + encodeURIComponent(service) : '')

    dispatch(requestServiceStatus())

    try {
      const response    = await fetch(url)
      const serviceList = await response.json()
      dispatch(receiveServiceStatus(serviceList))
    } catch(error) {
      dispatch(receiveServiceStatusError(error))
    }
  }
}

export function setServiceStatus(service = '', status = '') {
  return async dispatch => {
    const url = '//vvv/api/v1/services/' + encodeURIComponent(service) + '/' + encodeURIComponent(status)

    dispatch(requestServiceStatus())

    try {
      const response    = await fetch(url, {method: 'put'})
      const serviceList = await response.json()
      dispatch(receiveServiceStatus(serviceList))
    } catch(error) {
      dispatch(receiveServiceStatusError(error))
    }
  }
}
