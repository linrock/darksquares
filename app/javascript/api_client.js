import axios from 'axios'
import store from 'store'


const createAuthClient = () => {
  const token = store.get('access_token')
  return axios.create({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

let authRequest = createAuthClient()

export const createGame = function(data) {
  return authRequest.post(`/api/v1/games`, data)
}

export const createAnnotation = function(gameId, data) {
  return authRequest.post(`/api/v1/games/${gameId}/annotations`, data)
}

export const createSession = function(data) {
  data.grant_type = 'password'
  return axios.post(`/oauth/token`, data).then(response => {
    const accessToken = response.data.access_token
    store.set('access_token', accessToken)
    authRequest = createAuthClient()
  })
}
