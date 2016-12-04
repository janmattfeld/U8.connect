import { combineReducers } from 'redux'
import { REQUEST_START, REQUEST_ERROR, REQUEST_SUCCESS } from '../Constants/ActionTypes'

const request = (state = {running: false, resource: '', error: null}, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        running: true,
        command: action.payload.command
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        running: false
      }
    case REQUEST_ERROR:
      return {
        ...state,
        running: false,
        error: action.payload.error
      }
    default:
      return {...state}
  }
}

export default request
