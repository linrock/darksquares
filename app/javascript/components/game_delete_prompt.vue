<template lang="pug">
  .game-delete-prompt
    .prompt-text Are you sure you want to delete this game?

    .actions  
      button.confirm(@click="deleteGame") Delete game
      button.cancel(@click="cancelDelete") Cancel

</template>

<script>
  import router from '../router'
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
      deleteGame() {
        this.$store.dispatch('deleteGame', this.game)
        router.go(-1) || router.replace({ path: '/' })
        this.gameState.isDeleting = false
      },
      cancelDelete() {
        this.gameState.isDeleting = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

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

  .confirm
    background highlight-color
    width 150px

  .cancel
    background rgb(200, 200, 200)
    width 120px

  .game-delete-prompt
    margin-top 50px

  .actions
    margin-top 20px

    .confirm
      margin-right 20px

</style>
