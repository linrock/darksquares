<template lang="pug">
  section.mini-board-view
    game-info(:pgnHeaders="boardState.pgnHeaders" v-if="showHeaderInfo")
    chessboard(:fen="boardState.fen"
               :highlights="boardState.highlights"
               :squareSize="squareSize")
    .position-info
      game-position
      position-evaluation
    pgn-headers(v-if="showPgn")

</template>

<script>
  import GameInfo from './game_info.vue'
  import Chessboard from './chessboard.vue'
  import GamePosition from './game_position.vue'
  import PositionEvaluation from './position_evaluation.vue'
  import PgnHeaders from './pgn_headers.vue'
  import { state } from '../store/miniboard'

  export default {
    props: {
      showHeaderInfo: {
        type: Boolean,
        default: true,
      },
      showPgn: {
        type: Boolean,
        default: false,
      },
      squareSize: {
        type: Number,
        default: null,
      }
    },

    data: function() {
      return {
        boardState: state,
      }
    },

    computed: {
      fen: function() {
        return this.boardState.fen
      }
    },

    components: {
      GameInfo,
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
        margin-right auto

</style>
