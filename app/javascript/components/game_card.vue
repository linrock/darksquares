<template>
  <div class="game-card">
    <div class="collapse-game-button"
         @click="gameState.expanded = false" v-if="gameState.expanded">-</div>
    <div class="graph-container" @mouseenter="setCurrentPgn">
      <game-info :pgnHeaders="gameData.pgnHeaders"/>
      <hover-graph-clickable :width="600" :height="150" :listOfPoints="gameData.graphPoints"
                             :positions="gameData.positions" :moves="gameData.moves"
                             :bestMoves="gameData.bestMoves"
                             :annotations="gameData.annotations"
                             :pgn="gameData.pgn"
                             :gameState="gameState"/>
    </div>
    <annotation-previews :annotations="gameData.annotations" v-if="showAnnotationPreviews"/>
    <move-list :moves="gameData.moves"
               :annotations="gameData.annotations" :gameState="gameState"
               v-if="gameState.expanded"
               @createdAnnotation="createdAnnotation"/>
    <game-ending :result="gameResult" v-if="gameState.expanded"/>
  </div>
</template>

<script>
  import AnnotationPreviews from './annotation_previews.vue'
  import GameInfo from './game_info.vue'
  import GameEnding from './game_ending.vue'
  import MoveList from './move_list.vue'
  import HoverGraphClickable from './hover_graph_clickable.vue'
  import { state } from '../store/miniboard'

  export default {
    props: {
      gameIndex: Number,
      gameData: Object,
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
        this.boardState.pgn = this.gameData.pgn
        this.boardState.pgnHeaders = this.gameData.pgnHeaders
      },
      createdAnnotation: function(options) {
        const positionAnnotations = this.gameData.annotations[options.i] || []
        positionAnnotations.push(options.annotation)
        const annotations = this.gameData.annotations.slice()
        annotations[options.i] = positionAnnotations
        this.gameData.annotations = annotations
      }
    },

    computed: {
      showAnnotationPreviews: function() {
        return !this.gameState.expanded
      },
      showMoveList: function() {
        return this.gameState.expanded
      },
      gameResult: function() {
        return this.gameData.pgnHeaders["Result"]
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
