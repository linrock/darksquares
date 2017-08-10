<template lang="pug">
  span.hover-move(@mouseenter="showPosition" @mouseleave="resetPosition") {{ moveString }}

</template>

<script>
  import { state } from '../store/miniboard'

  export default {
    props: {
      moveString: {
        type: String,
        required: true,
      },
      fen: {
        type: String,
        required: true,
      }
    },

    data: function() {
      return {
        initialFen: null,
        initialHighlights: null,
        initialMoveString: null,
        initialBestMove: null,
        initialScore: null,
      }
    },

    methods: {
      showPosition: function() {
        this.initialFen = state.fen
        this.initialHighlights = state.highlights
        this.initialMoveString = state.move
        this.initialBestMove = state.bestMove
        this.initialScore = state.score
        state.move = this.moveString
        state.fen = this.fen
        state.highlights = []
        state.bestMove = ""
        state.score = ""
      },
      resetPosition: function() {
        state.move = this.initialMoveString
        state.fen = this.initialFen
        state.highlights = this.initialHighlights
        state.bestMove = this.initialBestMove
        state.score = this.initialScore
      }
    }
  }
</script>
