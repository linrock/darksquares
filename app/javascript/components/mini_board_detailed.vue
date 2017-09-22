<template lang="pug">
  section.mini-board-view
    chessboard(
      :fen="boardState.fen"
      :shouldShowLabels="shouldShowLabels"
      :highlights="boardState.highlights"
      :squareSize="squareSize"
      :perspective="perspective"
    )
    .position-info
      game-position
      position-evaluation
    pgn-headers(v-if="showPgn" :pgnHeaders="boardState.pgnHeaders")

</template>

<script>
  import Chessboard from './chessboard.vue'
  import GamePosition from './game_position.vue'
  import PositionEvaluation from './position_evaluation.vue'
  import PgnHeaders from './pgn_headers.vue'
  import { boardState } from '../store/miniboard'

  export default {
    props: {
      showPgn: {
        type: Boolean,
        default: false,
      },
      shouldShowLabels: {
        type: Boolean,
      },
      squareSize: {
        type: Number,
        default: null,
      },
      perspective: {
        type: String,
        default: 'white'
      }
    },

    data() {
      return {
        boardState,
      }
    },

    computed: {
      fen() {
        return this.boardState.fen
      }
    },

    components: {
      Chessboard,
      GamePosition,
      PositionEvaluation,
      PgnHeaders,
    },
  }
</script>

<style lang="stylus" scoped>
  .mini-board-view
    .position-info
      margin-top 10px
      display flex
      justify-content flex-end

      .game-position
        align-self flex-start

      .position-evaluation
        margin-left auto

    .pgn-headers
      margin-top 25px

</style>
