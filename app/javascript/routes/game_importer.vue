<template lang="pug">
  main#game-importer
    .content
      section.left-side
        chessboard(:fen="boardState.fen" :squareSize="55")

      section.right-side
        form(@submit="importGame")
          textarea(ref="pgn" class="pgn-importer")
          .commands
            input(type="submit" value="Import PGN")
            .checkbox
              input(type="checkbox")
              | Submit this game to the homepage

</template>

<script>
  import router from '../router'
  import Chess from 'chess.js'
  import requireLogin from './guards/require_login'
  import { state } from '../store/miniboard'
  import Chessboard from '../components/chessboard.vue'
  import { createGame } from '../api/requests'

  export default {
    beforeRouteEnter: requireLogin,

    data() {
      return {
        boardState: state
      }
    },

    methods: {
      importGame: function(e) {
        e.preventDefault()
        const pgn = this.$refs.pgn.value
        const cjs = new Chess()
        if (cjs.load_pgn(pgn)) {
          const data = {
            game: {
              pgn: pgn
            }
          }
          createGame(data).then(response => {
            router.push({ path: `/games/${response.data.game.id}` })
          })
        } else {
          console.log("pgn is invalid!")
        }
      },
    },

    components: {
      Chessboard
    }
  }
</script>

<style lang="stylus" scoped>
  #game-importer
    display: flex

  textarea
    width 500px
    height 500px
    font-size 16px
    padding 10px
    display block

  input[type="submit"]
    color white
    background rgb(58, 137, 201)
    border none
    border-radius 2px
    font-size 18px
    padding 7px 24px

    &:hover
      cursor pointer
      opacity 0.9

  .content
    display flex
    width 1200px
    margin-left 80px
    padding-top 30px

    section.right-side
      margin-left 40px

      .commands
        display flex
        margin-top 20px

      .checkbox
        margin-left 10px

</style>
