import Vue from 'Vue' 
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
      })
    }
  },

  getters: {
    getUser: state => username => state.users[username]
  }
}

export default usersStore
