<template lang="pug">
  main#game-importer
    sub-header
      div New Game

    .content
      section.left-side
        chessboard(:fen="boardState.fen" :squareSize="55")

      section.right-side
        h1 Import Game
        .description
          | Enter a PGN or move the pieces on the board
        form(@submit="importGame")
          textarea(ref="pgn" class="pgn-importer" placeholder="1.d4 d5 2.c4 e6 3.Nf3 c6")
          .commands
            input(type="submit" value="Import PGN")
            .checkbox
              input(type="checkbox")
              | Submit this game to the homepage

</template>

<script>
  import Chess from 'chess.js'
  import router from '../router'
  import SubHeader from '../layouts/sub_header'
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
      SubHeader,
      Chessboard
    }
  }
</script>

<style lang="stylus" scoped>
  textarea
    width 500px
    height 388px
    font-size 16px
    padding 15px
    display block
    border 1px solid rgba(0,0,0,0.15)
    border-radius 2px

    &::placeholder
      color rgba(0,0,0,0.3)

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

    h1
      font-size 16px
      font-weight bold

    .description
      color #2D2D2D
      font-size 14px
      margin 8px 0 16px

    .commands
      display flex
      align-items center
      margin-top 20px

    .checkbox
      margin-left 20px

      input
        margin-right 10px

</style>
