import { api } from '../../api/client'
import {
  getMe,
  createSession,
  createUser
} from '../../api/requests'
import {
  getAccessToken,
  getUsername,
  setUsername
} from '../../persistence/local_storage'

const currentUserStore = {
  state: {
    username: getAccessToken() && getUsername(),
  },

  mutations: {
    setCurrentUser(state, username) {
      state.username = username
      setUsername(username)
    }
  },

  actions: {
    fetchMyUserInfo({ commit }) {
      getMe().then(response => {
        const username = response.data.username
        commit('setCurrentUser', username)
      })
    },
    logIn({ commit, dispatch }, requestData) {
      return createSession(requestData).then(response => {
        const accessToken = response.data.access_token
        api.createHttpClient(accessToken)
        dispatch('fetchMyUserInfo')
        return response
      })
    },
    logOut({ commit }) {},
    signUp({ commit, dispatch }, requestData) {
      return createUser(requestData).then(response => {
        const accessToken = response.data.access_token
        api.createHttpClient(accessToken)
        dispatch('fetchMyUserInfo')
        return response
      })
    },
  },

  getters: {
    username: state => state.username
  }
}

export default currentUserStore
