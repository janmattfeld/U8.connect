import { combineReducers } from 'redux'

import navigation from './navigationReducer'
import request from './apiReducer'
import transport from './transportReducer'

const lastAction = (state = {}, action) => {
  console.log("$$Action: ", action.type)
  return action
}

export default combineReducers({
  navigation,
  lastAction,
  request,
  transport
})
