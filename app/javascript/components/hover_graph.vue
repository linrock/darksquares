<template>
  <div @mousemove="setIndex" @mouseenter="showLineIndicator" @mouseleave="hideLineIndicator"
       class="hover-graph">
    <stacked-graph :width="width" :height="height" :listOfPoints="listOfPoints"/>
    <hover-indicator :width="width" :height="height" :i="i"
                     :points="listOfPoints[listOfPoints.length - 1]"
                     :style="indicatorStyle"/>
  </div>
</template>

<script>
  import StackedGraph from './stacked_graph'
  import HoverIndicator from './hover_indicator'
  import { state } from '../store/miniboard'

  export default {
    props: {
      positions: Array,
      moves: Array,
      listOfPoints: Array,
      annotations: Array,
      width: Number,
      height: Number,
    },

    data: function() {
      return {
        globalState: state,
        i: 0,
        shouldShowLine: false
      }
    },

    // global state changes - fen, move, score, highlights
    //
    watch: {
      i: function(i) {
        const position = this.positions[i]
        if (position) {
          state.fen = position
        }
        if (i === 0) {
          state.score = ""
        } else if (this.scores[i] !== undefined) {
          state.score = this.scores[i]
        }
        if (this.moves) {
          const j = i - 1
          const move = this.moves[j]
          if (move) {
            const moveNum = `${~~(1 + j/2)}${j % 2 === 0 ? `.` : `...`}`
            const moveSan = move.san
            state.move = `${moveNum} ${moveSan}`
            state.highlights = [move.from, move.to]
          } else {
            state.move = ``
            state.highlights = []
          }
        }
        if (this.annotations) {
          state.annotations = this.annotations[i] ? this.annotations[i] : ""
        }
      }
    },

    methods: {
      setIndex: function(e) {
        this.i = ~~(this.nPoints * e.offsetX / this.width)
      },
      showLineIndicator: function() {
        this.shouldShowLine = true
      },
      hideLineIndicator: function() {
        this.shouldShowLine = false
      }
    },

    computed: {
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
      HoverIndicator
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
</style>
