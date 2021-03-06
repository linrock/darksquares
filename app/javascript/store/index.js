import Vue from 'vue'
import Vuex from 'vuex'

import cardLists from './modules/card_lists'
import userCache from './modules/user_cache'
import gameCache from './modules/game_cache'
import annotationCache from './modules/annotation_cache'
import activeGame from './modules/active_game'
import activeItem from './modules/active_item'
import currentUser from './modules/current_user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameVotes: {},
    modal: {
      isOpen: false,
    },
  },

  mutations: {
    setModalOpenState(state, isOpen) {
      state.modal.isOpen = isOpen
    },
    setGameVote(state, { gameId, value }) {
      Vue.set(state.gameVotes, gameId, value)
    }
  },

  actions: {
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
    getGameVote: state => gameId => state.gameVotes[gameId] || 0
  },

  modules: {
    cardLists,
    userCache,
    gameCache,
    annotationCache,
    activeGame,
    activeItem,
    currentUser
  }
})

export default store
