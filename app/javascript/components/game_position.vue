<template lang="pug">
  .game-position
    .move-name {{ move }}

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
      move() {
        return this.boardState.move
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .move-name
    font-size 16px
    font-weight bold
    height 18px

</style>
