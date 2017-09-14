import Vue from 'Vue' 
import Annotation from '../../models/annotation'
import { deleteAnnotation } from '../../api/requests'

const annotationsStore = {
  state: {
    annotations: {}
  },

  mutations: {
    setAnnotation(state, annotation) {
      Vue.set(state.annotations, annotation.id, annotation)
    },
    removeAnnotation(state, annotation) {
      delete(state.annotations[annotation.id])
    }
  },

  actions: {
    createGame({ dispatch, commit }, gameData) {
      return createGame(gameData).then(response => {
        const game = new Game(response.data.game)
        dispatch('addGames', { games: [game] })
        return game
      })
    },
    deleteAnnotation({ dispatch, commit }, annotation) {
      deleteAnnotation(annotation).then(response => dispatch('removeAnnotation', annotation))
    },
    addAnnotations({ commit }, { annotations }) {
      annotations.forEach(annotation => commit('setAnnotation', annotation))
    },
    removeAnnotation({ commit }, annotation) {
      commit('removeAnnotation', annotation)
    },
  },

  getters: {
    getAnnotation: state => annotationId => state.annotations[annotationId]
  }
}

export default annotationsStore
