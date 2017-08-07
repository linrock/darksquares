import APIClient from './client'
import { setUsername } from '../store/local_storage'

const api = new APIClient()

// POST

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

// GET

export const getGames = function() {
  return api.get(`/api/v1/games`)
}

export const getGame = function(id) {
  return api.get(`/api/v1/games/${id}`)
}

export const getMyGames = function() {
  return api.get(`/api/v1/users/me/games`)
}

export const getUserInfo = function() {
  return api.get(`/api/v1/users/me`).then(response => {
    setUsername(response.data.username)
  })
}

// DELETE

export const deleteAnnotation = function(annotation) {
  return api.delete(`/api/v1/games/${annotation.gameId}/annotations/${annotation.id}`)
}
