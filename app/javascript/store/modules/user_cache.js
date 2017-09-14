import Vue from 'vue' 
import User from '../../models/user'
import { getUserProfile } from '../../api/requests'

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
    }
  },

  getters: {
    getUser: state => username => state.users[username]
  }
}

export default usersStore
