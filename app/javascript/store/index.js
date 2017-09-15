import Vue from 'vue'
import Vuex from 'vuex'

import cardLists from './modules/card_lists'
import userCache from './modules/user_cache'
import gameCache from './modules/game_cache'
import annotationCache from './modules/annotation_cache'

import { getMe } from '../api/requests'
import {
  getAccessToken,
  getUsername,
  setUsername
} from '../persistence/local_storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeGameKey: null,
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
    setActiveGameKey(state, key) {
      state.activeGameKey = key
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
    setActiveGameKey({ commit }, key) {
      commit('setActiveGameKey', key)
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
    annotationCache
  }
})

export default store
