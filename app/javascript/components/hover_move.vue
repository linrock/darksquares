<template lang="pug">
  span.hover-move(@mouseenter="showPosition" @mouseleave="resetPosition") {{ moveString }}

</template>

<script>
  import { applyStateChange, boardState } from '../store/miniboard'

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
      showPosition() {
        this.initialFen = boardState.fen
        this.initialHighlights = boardState.highlights
        this.initialMoveString = boardState.move
        this.initialBestMove = boardState.bestMove
        this.initialScore = boardState.score
        applyStateChange({
          move: this.moveString,
          fen: this.fen,
          highlights: [],
          bestMove: "",
          score: ""
        })
      },
      resetPosition() {
        applyStateChange({
          move: this.initialMoveString,
          fen: this.initialFen,
          highlights: this.initialHighlights,
          bestMove: this.initialBestMove,
          score: this.initialScore
        })
      }
    }
  }
</script>
