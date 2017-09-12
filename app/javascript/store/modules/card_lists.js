import Vue from 'vue'
import Game from '../../models/game'
import { getGames } from '../../api/requests'
import { gameCache } from '../game_cache'

const store = {
  state: {
    routes: {
      '/': {
        gameIds: new Set(),
        lastPageNum: 0,
        isFetching: false,
        hasMorePages: true,
        scrollY: 0,
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
      Vue.set(state.routes, payload.routeKey, {
        gameIds: routeData.gameIds,
        lastPageNum: payload.lastPageNum,
        hasMorePages: payload.hasMorePages,
      })
    },
    saveScrollPosition(state, { routeKey, scrollY }) {
      state.routes[routeKey].scrollY = scrollY
    }
  },

  actions: {
    fetchGames({ commit, state }, routeKey) {
      console.log(`fetchGames action triggered at ${routeKey}`)
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
    saveScrollPosition({ commit }, payload) {
      commit('saveScrollPosition', payload)
    }
  },

  getters: {
    games: state => routeKey => {
      return Array.from(state.routes[routeKey].gameIds).map(id => gameCache.getGame(id))
    },
    scrollPosition: state => routeKey => {
      return state.routes[routeKey].scrollY
    },
    isFetching: state => routeKey => {
      return state.routes[routeKey].isFetching
    },
    isComplete: state => routeKey => {
      return !state.routes[routeKey].hasMorePages
    }
  }
}

export default store
