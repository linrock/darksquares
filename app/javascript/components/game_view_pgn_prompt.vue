<template lang="pug">
  .game-view-pgn-prompt
    textarea(readonly) {{ game.pgn }}

    .actions  
      button.cancel(@click="cancel") Cancel

</template>

<script>
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      gameState: {
        type: Object,
        required: true
      }
    },

    methods: {
      cancel() {
        this.gameState.isViewingPgn = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .game-view-pgn-prompt
    margin-top 20px

    .actions
      margin-top 20px

  textarea
    font-size 12px
    padding 5px 12px
    width 100%
    height 420px
    border 1px solid rgba(0,0,0,0.1)
    border-radius 2px

  button
    border none
    border-radius 2px
    color white
    font-size 18px
    padding 7px 0
    text-align center
    opacity 0.9

    &:hover
      cursor pointer
      opacity 1

    &.cancel
      background rgb(200, 200, 200)
      width 120px

</style>
