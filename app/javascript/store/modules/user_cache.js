import Vue from 'vue' 
import User from '../../models/user'
import { getUserProfile } from '../../api/requests'

const getUsernameFromRouteKey = (routeKey) => routeKey.split("/")[2]

const usersStore = {
  state: {
    users: {}
  },

  mutations: {
    setUser(state, user) {
      Vue.set(state.users, user.username, user)
    }
  },

  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    fetchUserProfile({ dispatch, commit }, username) {
      return getUserProfile(username).then(response => {
        const user = new User(response.data.user)
        dispatch('setUser', user)
        if (user.games.length) {
          dispatch('addGames', {
            routeKey: `/u/${username}/games`,
            games: user.games
          })
        }
        if (user.annotations.length) {
          dispatch('addAnnotations', {
            routeKey: `/u/${username}/annotations`,
            annotations: user.annotations
          })
        }
      })
    },
    addGames({ commit, getters }, { routeKey, games, prepend }) {
      if (!prepend) {
        return
      }
      const user = getters.getUser(getUsernameFromRouteKey(routeKey))
      if (!user) {
        return
      }
      user.gamesCount += games.length
      commit('setUser', user)
    },
    removeGame({ commit, getters }, game) {
      const username = getters.username
      if (username === game.user.username) {
        const user = getters.getUser(username)
        if (!user) {
          return
        }
        user.gamesCount -= 1
        commit('setUser', user)
      }
    },
    addAnnotations({ commit, getters }, { routeKey, annotations, prepend }) {
      if (!prepend) {
        return
      }
      const user = getters.getUser(getUsernameFromRouteKey(routeKey))
      if (!user) {
        return
      }
      user.annotationsCount += annotations.length
      commit('setUser', user)
    },
    removeAnnotation({ commit, getters }, annotation) {
      const username = getters.username
      if (username === annotation.username) {
        const user = getters.getUser(username)
        if (!user) {
          return
        }
        user.annotationsCount -= 1
        commit('setUser', user)
      }
    }
  },

  getters: {
    getUser: state => username => state.users[username]
  }
}

export default usersStore
