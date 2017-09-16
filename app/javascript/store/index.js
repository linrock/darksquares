import Vue from 'vue'
import Vuex from 'vuex'

import cardLists from './modules/card_lists'
import userCache from './modules/user_cache'
import gameCache from './modules/game_cache'
import annotationCache from './modules/annotation_cache'
import activeGame from './modules/active_game'

import { getMe } from '../api/requests'
import {
  getAccessToken,
  getUsername,
  setUsername
} from '../persistence/local_storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameVotes: {},
    currentUser: {
      username: getAccessToken() && getUsername(),
    },
    modal: {
      isOpen: false,
    },
  },

  mutations: {
    setCurrentUser(state, username) {
      state.currentUser.username = username
      setUsername(username)
    },
    setModalOpenState(state, isOpen) {
      state.modal.isOpen = isOpen
    },
    setGameVote(state, { gameId, value }) {
      Vue.set(state.gameVotes, gameId, value)
    }
  },

  actions: {
    fetchMyUserInfo({ commit }) {
      getMe().then(response => {
        const username = response.data.username
        commit('setCurrentUser', username)
      })
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
    currentUser: state => state.currentUser,
    getGameVote: state => gameId => state.gameVotes[gameId] || 0
  },

  modules: {
    cardLists,
    userCache,
    gameCache,
    annotationCache,
    activeGame
  }
})

export default store
