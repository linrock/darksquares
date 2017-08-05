<template>
  <div class="hover-graph-clickable">
    <div @mousemove="setIndex"
         @mouseenter="shouldShowLine = true" @mouseleave="shouldShowLine = false"
         @click="gameState.expanded = true"
         class="hover-graph">
      <stacked-graph :width="width" :height="height" :listOfPoints="listOfPoints"/>
      <hover-indicator :width="width" :height="height" :i="gameState.i"
                       :points="scores"
                       :style="indicatorStyle"/>
    </div>
  </div>
</template>

<script>
  import StackedGraph from './stacked_graph'
  import HoverIndicator from './hover_indicator'
  import MoveList from './move_list'
  import { state } from '../store/miniboard'

  export default {
    props: {
      positions: Array,
      moves: Array,
      bestMoves: Array,
      listOfPoints: Array,
      annotations: Array,
      pgn: String,
      gameState: Object,
      width: Number,
      height: Number,
    },

    data: function() {
      return {
        globalState: state,
        shouldShowLine: false,
      }
    },

    // global state changes - fen, move, score, highlights, annotations
    //
    watch: {
      i: function(i) {
        const position = this.positions[i]
        if (position) {
          state.fen = position
        }
        if (i === 0) {
          state.score = ""
          state.bestMove = ""
        } else {
          if (this.scores[i] !== undefined) {
            state.score = this.scores[i]
          }
          if (this.bestMoves[i] !== undefined) {
            state.bestMove = this.bestMoves[i]
          }
        }
        const j = i - 1
        if (this.moves) {
          const move = this.moves[j]
          if (move) {
            const moveNum = `${~~(1 + j/2)}.${j % 2 === 0 ? `` : `..`}`
            const moveSan = move.san
            state.move = `${moveNum} ${moveSan}`
            state.highlights = [move.from, move.to]
          } else {
            state.move = ``
            state.highlights = []
          }
        }
        if (this.annotations) {
          state.annotations = this.annotations[j] ? this.annotations[j] : ""
        }
      }
    },

    methods: {
      setIndex: function(e) {
        this.gameState.i = ~~(this.nPoints * e.offsetX / this.width)
      },
    },

    computed: {
      i: function() {
        return this.gameState.i
      },
      scores: function() {
        return this.listOfPoints[this.listOfPoints.length - 1]
      },
      nPoints: function() {
        return this.listOfPoints[0].length
      },
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

<style scoped>
  .hover-graph {
    position: relative;
  }

  .hover-indicator {
    position: absolute;
    left: 0;
    top: 0;
  }

  .move-list {
    color: #222;
    font-size: 15px;
    line-height: 20px;
  }
</style>
