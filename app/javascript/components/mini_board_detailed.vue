<template>
  <div class="mini-board-view">
    <game-info :pgnHeaders="boardState.pgnHeaders" v-if="showHeaderInfo"/>
    <mini-board :fen="boardState.fen" :highlights="boardState.highlights"/>
    <div class="position-info">
      <game-position/>
      <position-evaluation/>
    </div>
    <div class="position-annotations" v-if="showAnnotations">
      <div class="annotation" v-for="annotation in positionAnnotations">
        {{ annotation }}
      </div>
    </div>
    <pgn-headers v-if="showPgn"/>
  </div>
</template>

<script>
  import GameInfo from './game_info.vue'
  import MiniBoard from './mini_board.vue'
  import GamePosition from './game_position.vue'
  import PositionEvaluation from './position_evaluation.vue'
  import PgnHeaders from './pgn_headers.vue'
  import { state } from '../store/miniboard'

  export default {
    props: {
      showHeaderInfo: {
        default: true,
        type: Boolean,
      },
      showPgn: {
        default: false,
        type: Boolean,
      },
      showAnnotations: {
        default: false,
        type: Boolean,
      },
    },

    data: function() {
      return {
        boardState: state,
      }
    },

    computed: {
      positionAnnotations() {
        return this.boardState.annotations
      },
    },

    components: {
      GameInfo,
      GamePosition,
      MiniBoard,
      PgnHeaders,
      PositionEvaluation,
    },
  }
</script>

<style lang="scss" scoped>
  .mini-board-view {
    .mini-board {
      margin-top: 17px;
    }

    .position-info {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;

      .game-position {
        margin-right: auto;
      }
    }
  }
</style>
