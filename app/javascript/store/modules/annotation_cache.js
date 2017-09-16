import Vue from 'vue' 
import Annotation from '../../models/annotation'
import {
  createAnnotation,
  patchAnnotation,
  deleteAnnotation
} from '../../api/requests'

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
    createAnnotation({ dispatch, commit, getters }, { game, annotation }) {
      dispatch('cancelAnnotationEdit')
      game.addAnnotation(annotation)
      return createAnnotation(game.id, annotation).then(response => {
        const newAnnotation = new Annotation(response.data.annotation)
        game.replaceAnnotation(annotation.move_string, newAnnotation)
        dispatch('addAnnotations', {
          annotations: [newAnnotation],
          routeKey: `/u/${getters.username}/annotations`,
          prepend: true
        })
      })
    },
    updateAnnotation({ dispatch, commit }, { annotation }) {
      dispatch('cancelAnnotationEdit')
      commit('setAnnotation', annotation)
      return patchAnnotation(annotation, { annotation }).then((response) => {
        commit('setAnnotation', new Annotation(response.data.annotation))
      })
    },
    deleteAnnotation({ dispatch, commit }, { game, annotation }) {
      game.removeAnnotation(annotation)
      if (annotation.id) {
        if (!annotation.game) {
          annotation.game = game
        }
        deleteAnnotation(annotation).then(response => dispatch('removeAnnotation', annotation))
      }
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
