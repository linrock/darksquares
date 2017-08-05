<template>
  <div class="position-evaluation">
    <span class="score" :style="style">{{ scoreStr }}</span>
    <span class="best-move" v-if="bestMove">
      - {{ bestMove }}
    </span>
  </div>
</template>

<script>
  import { state } from '../store/miniboard'

  export default {
    data: function() {
      return {
        globalState: state
      }
    },
    computed: {
      score: function() {
        return this.globalState.score
      },
      bestMove: function() {
        return this.globalState.bestMove
      },
      scoreStr: function() {
        if (this.score === 0) {
          return `Even`
        }
        if (!this.score) {
          return ``
        }
        return this.score < 0 ? this.score : `+${this.score}`
      },
      style: function() {
        if (this.score >= -0.5 && this.score <= 0.5) {
          return `color: rgba(0,0,0,0.7)`
        } else if (this.score > 0.5) {
          return `color: green`
        } else {
          return `color: red`
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .position-evaluation {
    font-size: 16px;
    font-weight: bold;
    height: 18px;
  }
</style>
