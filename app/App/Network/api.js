const API_URL = 'http://localhost:8080'

// Similar to:
// http://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
function fetchJson(url, request) {
  const finalRequest = request
    ? {
      ...request,
      body: JSON.stringify(request.body),
      headers: {
        ...request.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    : {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }

  return fetch(url, finalRequest).then(
    (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
      // Reject other status
      return response.json().then(Promise.reject.bind(Promise))
    },
    error => Promise.reject(error) // Network or connection failure
  )
}

export function getExample(query) {
  return fetchJson(`${API_URL}/get/path?query=${query}`)
}

export function postExample(userID, password) {
  return fetchJson(`${API_URL}/login`, {
    method: 'POST',
    body: {
      userID,
      password,
    },
  })
}

export function getStation(query) {
  return fetchJson(`${API_URL}/station?search=${query}`)
            // .then( (r) => {console.log("$$", r)})
}

export function getRoute(params) {
  return fetchJson(`${API_URL}/route?fromId=${params.from}&toId=${params.to}`)
}

export const request = (resource, params) => {
  switch(resource){
    case 'startpoint':
    case 'endpoint':
      return getStation(params)
    case 'routes':
      return getRoute(params)
    default:
      return new Promise( (resolve, reject) => {
        reject()
      })
  }
}
