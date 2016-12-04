import { combineReducers } from 'redux'
import { REQUEST_SUCCESS, REQUEST_DESTINATION } from '../Constants/ActionTypes'

function from(state='', action){
  switch(action.type){
    case REQUEST_SUCCESS:
      if(action.payload.resource == 'startpoint'){
        return action.payload.result.name
      }
    default:
      return state
  }
}

function to(state={}, action){
  switch(action.type){
    case REQUEST_SUCCESS:
      if(action.payload.resource == 'endpoint'){
        return action.payload.result.name
      }
    default:
      return state
  }
}

function routes(state=[], action){
  switch(action.type){
    case REQUEST_SUCCESS:
      if(action.payload.resource == 'routes'){
        return action.payload.result
      }
    default:
      return state
  }
}

export default combineReducers({
  from,
  to
})