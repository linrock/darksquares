const activeGameStore = {
  state: {
    key: null,
    i: null,
  },

  mutations: {
    setActiveGameKey(state, key) {
      state.key = key
    },
    setPositionIndex(state, i) {
      state.i = i
    },
  },

  actions: {
    setActiveGameKey({ commit }, key) {
      commit('setActiveGameKey', key)
    },
    setPositionIndex({ commit, getters }, i) {
      if (getters.positionIndex != i) {
        commit('setPositionIndex', i)
      }
    }
  },

  getters: {
    activeGameKey: state => state.key,
    positionIndex: state => state.i,
  }
}

export default activeGameStore
