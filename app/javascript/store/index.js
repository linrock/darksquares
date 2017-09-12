import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeGameKey: null,
    currentUser: {
      username: null,
    },
  },

  mutations: {
    setActiveGameKey(state, key) {
      state.activeGameKey = key
    },
    setCurrentUser(state, payload) {
      state.currentUser.username = payload.username
    },
  },

  actions: {
    setActiveGameKey({ commit }, key) {
      commit('setActiveGameKey', key)
    },
    setCurrentUser({ commit }, payload) {
      commit('setCurrentUser', payload)
    },
  }
})

export default store
