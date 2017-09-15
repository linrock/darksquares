import Vue from 'vue' 
import Game from '../../models/game'
import { createGame, patchGame, deleteGame, getGame } from '../../api/requests'

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
    fetchGame({ dispatch }, gameId) {
      return getGame(gameId).then(response => {
        const game = new Game(response.data.game)
        dispatch('addGames', { games: [game] })
        return game
      })
    },
    createGame({ dispatch, getters }, gameData) {
      return createGame(gameData).then(response => {
        const game = new Game(response.data.game)
        dispatch('addGames', {
          routeKey: `/u/${getters.currentUser.username}/games`,
          games: [game],
          prepend: true,
        })
        return game
      })
    },
    patchGame({ dispatch, commit }, { game, gameData }) {
      return patchGame(game, gameData).then(response => {
        const game = new Game(response.data.game)
        dispatch('addGames', { games: [game] })
        return game
      })
    },
    deleteGame({ dispatch, commit }, game) {
      dispatch('removeGame', game)
      deleteGame(game)
    },
    addGames({ commit }, { games }) {
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
