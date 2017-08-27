<template lang="pug">
  .game-edit-prompt
    .prompt-text Edit this game

    input(type="text" placeholder="Name (optional)" ref="name" :value="game.name")

    pgn-headers(:pgnHeaders="game.pgnHeaders")

    .actions  
      button.save(@click="editGame") Save
      button.cancel(@click="cancel") Cancel

</template>

<script>
  import PgnHeaders from './pgn_headers'
  import { patchGame } from '../api/requests'
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true,
      },
      gameState: {
        type: Object,
        required: true,
      },
    },

    methods: {
      editGame() {
        const name = this.$refs.name.value.trim()
        patchGame(this.game, {
          game: { name }
        })
        this.game.name = name
        this.gameState.isEditing = false
      },
      cancel() {
        this.gameState.isEditing = false
      }
    },

    components: {
      PgnHeaders
    }
  }
</script>

<style lang="stylus" scoped>
  .game-edit-prompt
    margin-top 50px

    .actions
      margin-top 40px

      .cancel
        margin-left 20px

    .prompt-text
      margin-bottom 20px

  input[type="text"]
    font-size 18px
    padding 5px 12px
    width 400px
    margin-bottom 30px

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

    &.save
      background rgb(58, 137, 201)
      width 90px

    &.cancel
      background rgb(200, 200, 200)
      width 120px

</style>
