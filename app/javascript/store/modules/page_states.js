import Game from '../models/game'
import { gameCache } from './game_cache'
import { getGames } from '../api/requests'

const store = {
  state: {
    routes: {
      '/': {
        gameIds: new Set(),
        lastPageNum: 0,
        isFetching: false,
        hasMorePages: true,
        scrollTop: 0,
      }
    }
  },

  mutations: {
    startFetching(state, routeKey) {
      state.routes[routeKey].isFetching = true
    },
    stopFetching(state, routeKey) {
      state.routes[routeKey].isFetching = false
    },
    addGames(state, payload) {
      const routeData = state.routes[payload.routeKey]
      payload.gameIds.forEach(id => routeData.gameIds.add(id))
      routeData.lastPageNum = payload.lastPageNum
      routeData.hasMorePages = payload.hasMorePages
    },
    setScrollTop(state, { routeKey, scrollTop }) {
      state.routes[routeKey].scrollTop = scrollTop
    }
  },

  actions: {
    fetchGames({ commit, state }, routeKey) {
      const routeData = state.routes[routeKey]
      const pageNum = routeData.lastPageNum + 1
      commit('startFetching', routeKey)
      getGames(pageNum).then(response => {
        const games = Game.loadGamesFromData(response.data.games)
        gameCache.addGamesToSet('home', games)
        // TODO handle game votes
        commit('addGames', {
          routeKey,
          gameIds: games.map(game => game.id),
          hasMorePages: response.data.more_results,
          lastPageNum: pageNum,
        })
        setTimeout(() => commit('stopFetching', routeKey), 1000)
      })
    },
    setScrollTop({ commit }, payload) {
      commit('setScrollTop', payload)
    }
  },

  getters: {
    games: state => routeKey => {
      return state.routes[routeKey].gameIds.map(id => gameCache.getGame(id))
    },
    isFetching: state => routeKey => {
      return state.routes[routeKey].isFetching
    },
    isComplete: state => routeKey => {
      return !state.routes[routeKey].hasMorePages
    }
  }
}

export default const store
