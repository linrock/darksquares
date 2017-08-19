<template lang="pug">
  span.hover-move(@mouseenter="showPosition" @mouseleave="resetPosition") {{ moveString }}

</template>

<script>
  import { boardState } from '../store/miniboard'

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
        this.initialFen = boardState.fen
        this.initialHighlights = boardState.highlights
        this.initialMoveString = boardState.move
        this.initialBestMove = boardState.bestMove
        this.initialScore = boardState.score
        boardState.move = this.moveString
        boardState.fen = this.fen
        boardState.highlights = []
        boardState.bestMove = ""
        boardState.score = ""
      },
      resetPosition: function() {
        boardState.move = this.initialMoveString
        boardState.fen = this.initialFen
        boardState.highlights = this.initialHighlights
        boardState.bestMove = this.initialBestMove
        boardState.score = this.initialScore
      }
    }
  }
</script>
