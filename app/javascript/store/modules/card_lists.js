import Vue from 'vue'
import Game from '../../models/game'
import Annotation from '../../models/annotation'
import {
  getGames,
  getUserGames,
  getUserAnnotations,
} from '../../api/requests'

const getFetcher = (routeKey) => {
  if (routeKey === "/") {
    return getGames
  } else if (routeKey.match(/^\/u\//)) {
    const username = routeKey.split("/")[2]
    if (routeKey.match(/\/games$/)) {
      return (page) => getUserGames(username, page)
    } else if (routeKey.match(/\/annotations$/)) {
      return (page) => getUserAnnotations(username, page)
    }
  }
}

const initialRouteState = () => ({
  gameIds: new Set(),
  annotationIds: new Set(),
  lastPageNum: 0,
  isFetching: false,
  hasMorePages: true,
  scrollY: 0,
})

const cardListsStore = {
  state: {
    routes: {
      '/': initialRouteState()
    }
  },

  mutations: {
    initRouteData(state, routeKey) {
      if (state.routes[routeKey]) {
        return
      }
      Vue.set(state.routes, routeKey, initialRouteState())
    },
    startFetching(state, routeKey) {
      state.routes[routeKey].isFetching = true
    },
    stopFetching(state, routeKey) {
      state.routes[routeKey].isFetching = false
    },
    addGames(state, { routeKey, gameIds, lastPageNum, hasMorePages }) {
      const routeData = state.routes[routeKey]
      gameIds.forEach(id => routeData.gameIds.add(id))
      Vue.set(state.routes, routeKey, Object.assign({}, routeData, {
        gameIds: routeData.gameIds,
        lastPageNum,
        hasMorePages,
      }))
    },
    removeGameFromSets(state, game) {
      Object.keys(state.routes).forEach(routeKey => {
        const gameIds = state.routes[routeKey].gameIds
        if (gameIds.has(game.id)) {
          gameIds.delete(game.id)
          Vue.set(state.routes[routeKey], 'gameIds', gameIds)
        }
      })
    },
    addAnnotations(state, { routeKey, annotationIds, lastPageNum, hasMorePages }) {
      const routeData = state.routes[routeKey]
      annotationIds.forEach(id => routeData.annotationIds.add(id))
      Vue.set(state.routes, routeKey, Object.assign({}, routeData, {
        annotationIds: routeData.annotationIds,
        lastPageNum,
        hasMorePages,
      }))
    },
    saveScrollPosition(state, { routeKey, scrollY }) {
      state.routes[routeKey].scrollY = scrollY
    }
  },

  actions: {
    fetchFromServer({ dispatch, commit, state }, routeKey) {
      if (!state.routes[routeKey]) {
        commit('initRouteData', routeKey)
      }
      const routeData = state.routes[routeKey]
      const pageNum = routeData.lastPageNum + 1
      commit('startFetching', routeKey)
      getFetcher(routeKey)(pageNum).then(response => {
        if (response.data.games) {
          const games = Game.loadGamesFromData(response.data.games)
          dispatch('addGames', {
            routeKey,
            games,
            lastPageNum: pageNum,
            hasMorePages: response.data.more_results,
          })
        }
        if (response.data.game_votes) {
          response.data.game_votes.forEach(vote => dispatch('setGameVote', {
            gameId: vote.game_id,
            value: vote.value
          }))
        }
        if (response.data.annotations) {
          const annotations = response.data.annotations.map(data => new Annotation(data))
          dispatch('addAnnotations', {
            routeKey,
            annotations,
            lastPageNum: pageNum,
            hasMorePages: response.data.more_results,
          })
        }
        setTimeout(() => commit('stopFetching', routeKey), 1000)
      })
    },
    saveScrollPosition({ commit }, payload) {
      commit('saveScrollPosition', payload)
    },
    addGames({ state, commit }, { routeKey, games, lastPageNum, hasMorePages }) {
      if (!state.routes[routeKey]) {
        commit('initRouteData', routeKey)
      }
      const routeData = state.routes[routeKey]
      lastPageNum = typeof lastPageNum !== 'undefined' ? lastPageNum : routeData.lastPageNum
      hasMorePages = typeof hasMorePages !== 'undefined' ? hasMorePages : routeData.hasMorePages
      commit('addGames', {
        routeKey,
        gameIds: games.map(game => game.id),
        lastPageNum,
        hasMorePages
      })
    },
    addAnnotations({ state, commit }, { routeKey, annotations, lastPageNum, hasMorePages }) {
      if (!state.routes[routeKey]) {
        commit('initRouteData', routeKey)
      }
      const routeData = state.routes[routeKey]
      lastPageNum = typeof lastPageNum !== 'undefined' ? lastPageNum : routeData.lastPageNum
      hasMorePages = typeof hasMorePages !== 'undefined' ? hasMorePages : routeData.hasMorePages
      commit('addAnnotations', {
        routeKey,
        annotationIds: annotations.map(annotation => annotation.id),
        lastPageNum,
        hasMorePages
      })
    },
    removeGame({ commit }, game) {
      commit('removeGameFromSets', game)
    }
  },

  getters: {
    games: (state, getters) => routeKey => {
      const gameIds = state.routes[routeKey] ? state.routes[routeKey].gameIds : []
      return Array.from(gameIds).map(id => getters.getGame(id))
    },
    annotations: (state, getters) => routeKey => {
      const annotationIds = state.routes[routeKey] ? state.routes[routeKey].annotationIds : []
      return Array.from(annotationIds).map(id => getters.getAnnotation(id))
    },
    scrollPosition: state => routeKey => {
      return state.routes[routeKey] ? state.routes[routeKey].scrollY : 0
    },
    hasFetched: state => routeKey => {
      return state.routes[routeKey] && state.routes[routeKey].lastPageNum > 0
    },
    isFetching: state => routeKey => {
      return state.routes[routeKey] ? state.routes[routeKey].isFetching : false
    },
    isComplete: state => routeKey => {
      return !(state.routes[routeKey] ? state.routes[routeKey].hasMorePages : true)
    }
  }
}

export default cardListsStore
