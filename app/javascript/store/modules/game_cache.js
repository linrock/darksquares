import Vue from 'Vue' 
import Game from '../../models/game'
import { createGame, getGame } from '../../api/requests'

const gamesStore = {
  state: {
    games: {}
  },

  mutations: {
    setGame(state, game) {
      Vue.set(state.games, game.id, game)
    },
    removeGame(state, game) {
      delete(state.games[game.id])
    }
  },

  actions: {
    fetchGame({ dispatch, commit }, gameId) {
      return getGame(gameId).then(response => {
        const game = new Game(response.data.game)
        dispatch('addGames', { games: [game] })
        return game
      })
    },
    createGame({ dispatch, commit }, gameData) {
      return createGame(gameData).then(response => {
        const game = new Game(response.data.game)
        dispatch('addGames', { games: [game] })
        return game
      })
    },
    deleteGame({ dispatch, commit }, game) {
      deleteGame(game).then(response => dispatch('removeGame', game))
    },
    addGames({ commit }, { games }) {
      console.log(`adding ${games.length} games in game_cache`)
      games.forEach(game => commit('setGame', game))
    },
    removeGame({ commit }, game) {
      commit('removeGame', game)
    },
  },

  getters: {
    getGame: state => gameId => state.games[gameId]
  }
}

export default gamesStore
