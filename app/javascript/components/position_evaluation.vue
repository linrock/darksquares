<template lang="pug">
  .position-evaluation
    span.score(:style="scoreStyle") {{ scoreStr }}
    span.separator(v-if="scoreStr && bestMove") &ndash;
    span.best-move(v-if="bestMove") {{ bestMove }}

</template>

<script>
  import { boardState } from '../store/miniboard'

  export default {
    data() {
      return {
        boardState
      }
    },

    computed: {
      score() {
        return this.boardState.score
      },
      bestMove() {
        return this.boardState.bestMove
      },
      scoreStr() {
        let score = this.score
        if (score === 0) {
          score = `Even`
        } else if (score > 0) {
          if (score > 1000) {
            score = `Mate in ${score - 1000}`
          } else {
            score = `+${score}`
          }
        } else if (!this.score) {
          score = ``
        } else if (score < -1000) {
          score = `Mate in ${-(score + 1000)}`
        }
        return score
      },
      scoreStyle() {
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

<style lang="stylus" scoped>
  .position-evaluation
    font-size 16px
    font-weight bold
    height 18px

  .separator
    margin 0 5px

</style>
