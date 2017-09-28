<template lang="pug">
  .evaluation-graph-click
    .hover-graph(
      @mouseenter="showPositionIndicator"
      @mousemove="setPositionIndicatorIndex"
      @mouseleave="hidePositionIndicator"
      @click="handleClick"
    )
      stacked-graph(
        :width="width"
        :height="height"
        :listOfPoints="game.graphPoints"
      )
      transition(name="fade")
        d3-vertical-line(
          v-if="shouldShowPositionIndicator"
          :width="width"
          :height="height"
          :x="positionIndicatorX"
          color="rgba(0,0,0,0.15)"
        )
      transition(name="fade")
        hover-indicator(
          :width="width"
          :height="height"
          :i="$store.getters.positionIndex"
          :points="game.scores"
        )

</template>

<script>
  import D3VerticalLine from './d3_vertical_line'
  import StackedGraph from './stacked_graph'
  import HoverIndicator from './hover_indicator'
  import MoveList from './move_list'
  import Game from '../models/game'
  import { showGamePosition } from '../store/miniboard'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      clickedGraph: {
        type: Function,
        default: function() {}
      },
      width: Number,
      height: Number
    },

    data() {
      return {
        shouldShowPositionIndicator: false,
        positionIndicatorIndex: this.$store.getters.positionIndex
      }
    },

    methods: {
      positionIndexFromOffsetX(offsetX) {
        return ~~(this.game.nPoints * offsetX / this.width)
      },
      setPositionIndicatorIndex(e) {
        this.positionIndicatorIndex = this.positionIndexFromOffsetX(e.offsetX)
      },
      handleClick(e) {
        const positionIndex = this.positionIndexFromOffsetX(e.offsetX)
        this.$store.dispatch('setPositionIndex', positionIndex)
        showGamePosition(this.game, positionIndex)
        this.clickedGraph(this.positionIndex)
      },
      showPositionIndicator() {
        this.shouldShowPositionIndicator = true
      },
      hidePositionIndicator() {
        this.shouldShowPositionIndicator = false
      },
    },

    computed: {
      positionIndex() {
        return this.$store.getters.positionIndex
      },
      positionIndicatorX() {
        return this.positionIndicatorIndex / (this.game.nPoints - 1) * this.width
      }
    },

    components: {
      StackedGraph,
      D3VerticalLine,
      HoverIndicator,
      MoveList
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

  svg
    position absolute
    top 0
    left 0

    &.d3-vertical-line
      stroke rgba(0,0,0,0.3)

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
