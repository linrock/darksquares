// The currently-active game, both when hovering over a game card + on game page

const activeGameStore = {
  state: {
    id: null,
    positionIndex: 0,
    annotationInputIndex: -1,
    editingAnnotationId: -1,
  },

  mutations: {
    setActiveGameId(state, id) {
      state.id = id
    },
    setPositionIndex(state, positionIndex) {
      state.positionIndex = positionIndex
    },
    setAnnotationInputIndex(state, annotationInputIndex) {
      state.annotationInputIndex = annotationInputIndex
      state.editingAnnotationId = -1
    },
    setEditingAnnotationId(state, annotationId) {
      state.annotationInputIndex = -1
      state.editingAnnotationId = annotationId
    },
    cancelAnnotationEdit(state) {
      state.annotationInputIndex = -1
      state.editingAnnotationId = -1
    }
  },

  actions: {
    setActiveGameId({ commit, getters }, { id, resetPositionIndex }) {
      if (id !== getters.activeGameId) {
        if (resetPositionIndex) {
          commit('setPositionIndex', 0)
        }
        commit('setActiveGameId', id)
      }
    },
    setPositionIndex({ commit, getters }, positionIndex) {
      if (getters.positionIndex != positionIndex) {
        commit('setPositionIndex', positionIndex)
      }
    },
    setAnnotationInputIndex({ commit }, annotationInputIndex) {
      commit('setAnnotationInputIndex', annotationInputIndex)
    },
    editAnnotationId({ commit }, annotationId) {
      commit('setEditingAnnotationId', annotationId)
    },
    cancelAnnotationEdit({ commit }) {
      commit('cancelAnnotationEdit')
    }
  },

  getters: {
    activeGameId: state => state.id,
    activeGamePerspective: (state, getters) => {
      const game = getters.getGame(state.id)
      return game ? game.perspective : `white`
    },
    positionIndex: state => state.positionIndex,
    annotationInputIndex: state => state.annotationInputIndex,
    editingAnnotationId: state => state.editingAnnotationId,
  }
}

export default activeGameStore
