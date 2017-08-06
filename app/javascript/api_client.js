import axios from 'axios'
import {
  getAccessToken,
  setAccessToken,
  setUsername,
} from './store/local_storage'

class APIClient {

  constructor() {
    this.createHttpClient(getAccessToken())
  }

  createHttpClient(accessToken) {
    setAccessToken(accessToken)
    const options = {}
    if (accessToken) {
      options.headers = {
        'Authorization': `Bearer ${accessToken}`
      }
    }
    this.httpClient = axios.create(options)
  }

  post() {
    return this.httpClient.post(...arguments)
  }

  get() {
    return this.httpClient.get(...arguments)
  }
}

const api = new APIClient()

export const createGame = function(data) {
  return api.post(`/api/v1/games`, data)
}

export const createAnnotation = function(gameId, data) {
  return api.post(`/api/v1/games/${gameId}/annotations`, data)
}

export const createSession = function(data) {
  data.grant_type = 'password'
  return api.post(`/oauth/token`, data).then(response => {
    const accessToken = response.data.access_token
    api.createHttpClient(accessToken)
  })
}

export const createUser = function(data) {
  return api.post(`/api/v1/users`, data).then(response => {
    const accessToken = response.data.access_token
    api.createHttpClient(accessToken)
  })
}

export const getUserInfo = function() {
  return api.get(`/api/v1/users/me`).then(response => {
    setUsername(response.data.username)
  })
}
