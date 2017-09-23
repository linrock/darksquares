// The currently-active item (game or annotation) on card-list views

const activeItemStore = {
  state: {
    activeItemKey: null,
  },

  mutations: {
    setActiveItemKey(state, key) {
      state.activeItemKey = key
    }
  },

  actions: {
    setActiveItemKey({ commit }, key) {
      commit('setActiveItemKey', key)
    }
  },

  getters: {
    activeItemKey: state => state.activeItemKey
  }
}

export default activeItemStore
