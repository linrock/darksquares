<template lang="pug">
  .evaluation-graph
    .hover-graph(
      @mousemove="setPositionIndex"
      @click="handleClick"
    )
      stacked-graph(
        :width="width"
        :height="height"
        :listOfPoints="game.graphPoints"
      )
      transition(name="fade")
        hover-indicator(
          v-if="$store.getters.activeGameId === game.id"
          :width="width"
          :height="height"
          :i="$store.getters.positionIndex"
          :points="game.scores"
        )

</template>

<script>
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

    // global state changes - fen, move, score, highlights, annotations
    //
    methods: {
      setPositionIndex(e) {
        const positionIndex = ~~(this.game.nPoints * e.offsetX / this.width)
        this.$store.dispatch('setPositionIndex', positionIndex)
        showGamePosition(this.game, positionIndex)
      },
      handleClick() {
        this.clickedGraph(this.$store.getters.positionIndex)
      }
    },

    components: {
      StackedGraph,
      HoverIndicator,
      MoveList
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

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
