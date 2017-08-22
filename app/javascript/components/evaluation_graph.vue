<template lang="pug">
  .evaluation-graph
    .hover-graph(
      @mousemove="setPositionIndex"
      @mouseenter="shouldShowLine = true"
      @mouseleave="shouldShowLine = false"
      @click="handleClick"
    )
      stacked-graph(:width="width" :height="height" :listOfPoints="game.graphPoints")
      hover-indicator(
        :width="width"
        :height="height"
        :i="gameState.i"
        :points="game.scores"
        :style="indicatorStyle"
      )

</template>

<script>
  import StackedGraph from './stacked_graph'
  import HoverIndicator from './hover_indicator'
  import MoveList from './move_list'
  import Game from '../models/game'
  import { applyStateChange } from '../store/miniboard'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      gameState: {
        type: Object,
        required: true
      },
      clickedGraph: {
        type: Function,
        default: function() {}
      },
      shouldModifyBoard: {
        type: Boolean,
        default: false
      },
      width: Number,
      height: Number
    },

    data: function() {
      return {
        shouldShowLine: false,
      }
    },

    // global state changes - fen, move, score, highlights, annotations
    //
    methods: {
      setPositionIndex: function(e) {
        this.gameState.i = ~~(this.game.nPoints * e.offsetX / this.width)
        if (this.shouldModifyBoard) {
          applyStateChange(this.game.stateAtPositionIndex(this.gameState.i))
        }
      },
      handleClick: function() {
        this.clickedGraph(this.gameState.i)
      }
    },

    computed: {
      indicatorStyle: function() {
        return this.shouldShowLine ? `display: block` : `display: none`
      },
    },

    components: {
      StackedGraph,
      HoverIndicator,
      MoveList
    }
  }
</script>

<style lang="stylus" scoped>
  .hover-graph
    position relative

    &:hover
      cursor pointer

  .hover-indicator
    position absolute
    left 0
    top 0

  .move-list
    color #222
    font-size 15px
    line-height 20px

</style>
