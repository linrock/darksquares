const activeGameStore = {
  state: {
    key: null,
    positionIndex: 0,
    annotationInputIndex: -1,
    editingAnnotationId: -1,
  },

  mutations: {
    setActiveGameKey(state, key) {
      state.key = key
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
    setActiveGameKey({ commit }, key) {
      commit('setActiveGameKey', key)
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
    activeGameKey: state => state.key,
    positionIndex: state => state.positionIndex,
    annotationInputIndex: state => state.annotationInputIndex,
    editingAnnotationId: state => state.editingAnnotationId,
  }
}

export default activeGameStore
