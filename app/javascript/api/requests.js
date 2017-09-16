import { api } from './client'

// POST

export const createGame = function(data) {
  return api.post(`/api/v1/games`, data)
}

export const createAnnotation = function(gameId, data) {
  return api.post(`/api/v1/games/${gameId}/annotations`, data)
}

export const createSession = function(data) {
  return api.post(`/oauth/token`, data)
}

export const createUser = function(data) {
  return api.post(`/api/v1/users`, data)
}

export const createGameVote = function(gameId, data) {
  return api.post(`/api/v1/games/${gameId}/votes`, data)
}

export const createAnnotationVote = function(annotationId, data) {
  return api.post(`/api/v1/annotations/${annotationId}/votes`, data)
}

// GET

export const getGames = function(page) {
  return api.get(`/api/v1/games?page=${page}`)
}

export const getGame = function(id) {
  return api.get(`/api/v1/games/${id}`)
}

export const getGameStatus = function(id) {
  return api.get(`/api/v1/games/${id}/status`)
}

export const getMe = function() {
  return api.get(`/api/v1/users/me`)
}

export const getMyGames = function(page) {
  return api.get(`/api/v1/users/me/games?page=${page}`)
}

export const getMyAnnotations = function() {
  return api.get(`/api/v1/users/me/annotations`)
}

export const getUserProfile = function(username) {
  return api.get(`/api/v1/users/${username}`)
}

export const getUserGames = function(username, page) {
  return api.get(`/api/v1/users/${username}/games?page=${page}`)
}

export const getUserAnnotations = function(username, page) {
  return api.get(`/api/v1/users/${username}/annotations?page=${page}`)
}

// PATCH

export const patchGame = function(game, data) {
  return api.patch(`/api/v1/games/${game.id}`, data)
}

export const patchAnnotation = function(annotation, data) {
  return api.patch(`/api/v1/games/${annotation.gameId}/annotations/${annotation.id}`, data)
}

// DELETE

export const deleteGame = function(game) {
  return api.delete(`/api/v1/games/${game.id}`)
}

export const deleteAnnotation = function(annotation) {
  return api.delete(`/api/v1/games/${annotation.gameId}/annotations/${annotation.id}`)
}
