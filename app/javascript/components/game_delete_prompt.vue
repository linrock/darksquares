<template lang="pug">
  .delete-game-prompt
    .prompt-text Are you sure you want to delete this game?

    .actions  
      button.confirm-delete(@click="deleteGame") Delete game
      button.cancel-delete(@click="cancelDelete") Cancel

</template>

<script>
  import router from '../router'
  import { deleteGame } from '../api/requests'
  import { gameIdLists } from '../store/games'
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
        deleteGame(this.game)
        gameIdLists.home.splice(gameIdLists.home.findIndex(id => id === game.id), 1)
        gameIdLists.myGames.splice(gameIdLists.myGames.findIndex(id => id === game.id), 1)
        router.go(-1) || router.replace({ path: '/' })
        this.gameState.isDeleting = false
      },
      cancelDelete() {
        this.gameState.isDeleting = false
      }
    }
  }
</script>

<style lang="stylus">
  button
    background rgb(58, 137, 201)
    border none
    border-radius 2px
    color white
    font-size 18px
    padding 7px 0
    text-align center
    width 150px
    opacity 0.9

    &:hover
      cursor pointer
      opacity 1

  .delete-game-prompt
    margin-top 50px

  .actions
    margin-top 20px

  .confirm-delete
    margin-right 20px

</style>
