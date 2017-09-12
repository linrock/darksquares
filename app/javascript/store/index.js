import Vue from 'vue'
import Vuex from 'vuex'

import cardLists from './modules/card_lists'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeGameKey: null,
    gameVotes: {},
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
    setCurrentUser(state, { username }) {
      state.currentUser.username = username
    },
    setModalOpenState(state, isOpen) {
      state.modal.isOpen = isOpen
    },
    setGameVote(state, { gameId, value }) {
      Vue.set(state.gameVotes, gameId, value)
    }
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
    },
    setGameVote({ commit }, payload) {
      commit('setGameVote', payload)
    },
  },

  getters: {
    getGameVote: state => gameId => {
      return state.gameVotes[gameId] || 0
    }
  },

  modules: {
    cardLists
  }
})

export default store
