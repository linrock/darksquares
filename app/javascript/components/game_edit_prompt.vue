<template lang="pug">
  .game-edit-prompt
    .prompt-text Edit this game
    input(type="text" placeholder="Name (optional)" ref="name" :value="game.name")
    .perspective
      span Perspective
      input(
        type="radio"
        id="perspective-white"
        value="white"
        v-model="perspective"
      )
      label(for="perspective-white") White
      input(
        type="radio"
        id="perspective-black"
        value="black"
        v-model="perspective"
      )
      label(for="perspective-black") Black
    pgn-headers-editor(:game="game" ref="pgnHeadersEditor")
    .actions  
      button.save(@click="updateGame") Save
      button.cancel(@click="cancel") Cancel

</template>

<script>
  import PgnHeadersEditor from './pgn_headers_editor'
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

    data() {
      return {
        perspective: this.game.perspective
      }
    },

    methods: {
      getPgnHeaders() {
        const newPgnHeaders = {}
        this.$refs.pgnHeadersEditor.getPgnHeadersArray().forEach(pair => {
          const [header, value] = pair.map(str => str.trim())
          if (header && value) {
            newPgnHeaders[header] = value
          }
        })
        return newPgnHeaders
      },
      updateGame() {
        const name = this.$refs.name.value.trim()
        const newPgnHeaders = this.getPgnHeaders()
        const gameData = { game: {} }
        if (name) {
          gameData.game.name = name
        }
        if (this.game.pgnHeaders) {
          gameData.game.pgn_headers = newPgnHeaders
        }
        if (this.perspective) {
          gameData.game.perspective = this.perspective
        }
        this.$store.dispatch('patchGame', { game: this.game, gameData })
        this.game.name = name
        this.game.pgnHeaders = newPgnHeaders
        this.gameState.isEditing = false
      },
      cancel() {
        this.gameState.isEditing = false
      }
    },

    components: {
      PgnHeadersEditor
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

  .game-edit-prompt
    margin-top 20px

    .actions
      margin 40px 0

      .cancel
        margin-left 20px

    .prompt-text
      margin-bottom 20px

  input[type="text"]
    display block
    font-size 18px
    padding 5px 12px
    width 400px
    margin-bottom 30px

  .perspective
    margin 25px 0

    input[type="radio"]
      margin-left 25px

    label
      margin-left 5px

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
      background highlight-color
      width 90px

    &.cancel
      background rgb(200, 200, 200)
      width 120px

</style>
