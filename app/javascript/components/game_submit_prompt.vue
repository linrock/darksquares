<template lang="pug">
  .game-submit-prompt
    .prompt-text Give your game a name if you'd like.

    input(type="text" placeholder="Name (optional)" ref="name" :value="game.name")

    .actions  
      button.confirm(@click="submitGame") Submit game
      button.cancel(@click="cancel") Cancel

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
      submitGame() {
        this.$store.dispatch('patchGame', {
          game: this.game,
          gameData: {
            submit: true,
            game: {
              name: this.$refs.name.value.trim(),
            }
          }
        })
        router.push({ path: '/' })
        this.gameState.isSubmitting = false
      },
      cancel() {
        this.gameState.isSubmitting = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .game-submit-prompt
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

    &.confirm
      background highlight-color
      width 150px

    &.cancel
      background rgb(200, 200, 200)
      width 120px

</style>
