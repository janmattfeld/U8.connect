import { ActionTypes } from '../Constants'
import * as api from '../Network/api'

export const hideNavbar = () => ({type: 'HIDE_NAVBAR', payload:{} })
export const setCurrentStep = (id) => ({type: 'SET_STEP', payload:{id} })

export const changeScene = (scene) => ({
  type: 'CHANGE_SCENE',
  payload: scene
})

export const popScene = (scene) => ({
  type: 'POP_SCENE',
  payload: scene
})

// Async Requests
export const requestStart = (command) => ({type: 'REQUEST_START', payload: {command}})
export const requestSuccess = (resource, result) => ({type: 'REQUEST_SUCCESS', payload: {...result, resource}})
export const requestError = (error) => ({type: 'REQUEST_ERROR', payload: {error}})

export const request = (resource, params) => (dispatch) => {
  console.log("$$Request resource", resource)
  dispatch(requestStart(resource))
  return api.request(resource, params)
    .then(
      result => dispatch(requestSuccess({resource, result})),
      e => { console.log('Error ', e); dispatch(requestError(e)) } 
    )
}