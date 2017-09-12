import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeGameKey: null,
    currentUser: {
      username: null,
    },
    modal: {
      isOpen: false,
    },
  },

  mutations: {
    setActiveGameKey(state, key) {
      state.activeGameKey = key
    },
    setCurrentUser(state, payload) {
      state.currentUser.username = payload.username
    },
    setModalOpenState(state, isOpen) {
      state.modal.isOpen = isOpen
    },
  },

  actions: {
    setActiveGameKey({ commit }, key) {
      commit('setActiveGameKey', key)
    },
    setCurrentUser({ commit }, payload) {
      commit('setCurrentUser', payload)
    },
    openModal({ commit }) {
      commit('setModalOpenState', true)
    },
    closeModal({ commit }) {
      commit('setModalOpenState', false)
    }
  }
})

export default store
