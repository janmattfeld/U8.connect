import { combineReducers } from 'redux'
import { REQUEST_SUCCESS, REQUEST_DESTINATION, SET_TO, SET_FROM } from '../Constants/ActionTypes'

function from(state={name: '', extId: -1}, action){
  switch(action.type){
    case 'SET_FROM':
      return action.payload.name
    default:
      return state
  }
}

function to(state={name: '', extId: -1}, action){
  switch(action.type){
    case 'SET_TO':
      return action.payload.name
    default:
      return state
  }
}

function routes(state=[], action){
  switch(action.type){
    case 'REQUEST_SUCCESS':
      if(action.payload.resource.resource == 'routes'){
        return action.payload.resource.result
      }
    default:
      return state
  }
}

function stations(state=[], action){
  switch(action.type){
    case 'REQUEST_SUCCESS':
      console.log("$$save stations: ", action.payload.resource)
      if(action.payload.resource.resource == 'endpoint'
        || action.payload.resource.resource == 'startpoint'){
        console.log('$$store stations in state')
        return action.payload.resource.result
      }
    case 'REQUEST_START':
      if(action.payload.resoure == 'routes')
        return []
    case 'CLEAR_STATIONS':
        return []
    default:
      return [...state]
  }
}

export default combineReducers({
  from,
  to,
  routes,
  stations
})