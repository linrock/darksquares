<template>
  <div class="game-card">
    <div class="collapse-game-button"
         @click="gameState.expanded = false" v-if="gameState.expanded">-</div>
    <div class="graph-container" @mouseenter="setCurrentPgn">
      <game-info :pgnHeaders="game.pgnHeaders"/>
      <hover-graph-clickable :width="600" :height="150" :listOfPoints="game.graphPoints"
                             :positions="game.positions" :moves="game.moves"
                             :bestMoves="game.bestMoves"
                             :annotations="game.annotations"
                             :pgn="game.pgn"
                             :gameState="gameState"/>
    </div>
    <annotation-previews :annotations="game.annotations" v-if="showAnnotationPreviews"/>
    <move-list v-if="gameState.expanded"
               :game="game" :gameState="gameState"/>
    <game-ending :result="gameResult" v-if="gameState.expanded"/>
  </div>
</template>

<script>
  import AnnotationPreviews from './annotation_previews.vue'
  import GameInfo from './game_info.vue'
  import GameEnding from './game_ending.vue'
  import MoveList from './move_list.vue'
  import HoverGraphClickable from './hover_graph_clickable.vue'
  import Game from '../models/game'
  import { state } from '../store/miniboard'

  export default {
    props: {
      game: Game,
    },

    data: function() {
      return {
        boardState: state,
        gameState: {
          expanded: false,
          i: 0,
        },
      }
    },

    methods: {
      setCurrentPgn: function() {
        this.boardState.pgn = this.game.pgn
        this.boardState.pgnHeaders = this.game.pgnHeaders
      },
    },

    computed: {
      showAnnotationPreviews: function() {
        return !this.gameState.expanded
      },
      showMoveList: function() {
        return this.gameState.expanded
      },
      gameResult: function() {
        return this.game.pgnHeaders["Result"]
      },
    },

    components: {
      AnnotationPreviews,
      GameInfo,
      GameEnding,
      HoverGraphClickable,
      MoveList,
    }
  }
</script>

<style lang="scss" scoped>
  .game-card {
    position: relative;
  }

  .collapse-game-button {
    top: 5px;
    right: 5px;
    position: absolute;
    z-index: 1;

    &:hover {
      cursor: pointer;
    }
  }
</style>
