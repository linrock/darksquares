import axios from 'axios'

axios.defaults.headers.post['Authorization'] = `Bearer <token>`;

export const createGame = function(data) {
  return axios.post(`/api/v1/games`, data)
}

export const createAnnotation = function(gameId, data) {
  return axios.post(`/api/v1/games/${gameId}/annotations`, data)
}
