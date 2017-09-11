import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeGameKey: null,
  },

  mutations: {
    setActiveGameKey(state, key) {
      state.activeGameKey = key
    }
  },

  actions: {
    setActiveGameKey({ commit, state }, key) {
      commit('setActiveGameKey', key)
    }
  }
})

export default store
