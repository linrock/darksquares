<template lang="pug">
  main#game-importer
    sub-header Import Game
    .content
      section.left-side
        chessboard(:fen="fen" :squareSize="55")
      section.right-side
        h1 Import Game
        .description
          | Enter a PGN in the area below
        form(@submit="importGame")
          textarea.pgn-importer(
            ref="pgn"
            :placeholder="pgnPlaceholder"
            @input="updateBoardPosition"
          )
          .commands
            input(type="submit" :value="buttonText" :disabled="isSubmitting")
            .error-message {{ errorMessage }}
    page-title(title="Import game")

</template>

<script>
  import Chess from 'chess.js'
  import PageTitle from '../layouts/page_title'
  import SubHeader from '../layouts/sub_header'
  import Chessboard from '../components/chessboard.vue'
  import requireLogin from './guards/require_login'
  import router from '../router'

  export default {
    beforeRouteEnter: requireLogin,

    data() {
      const cjs = new Chess()
      return {
        cjs,
        fen: cjs.fen(),
        errorMessage: ``,
        isSubmitting: false,
        pgnPlaceholder: `[ECO "D30"]\n[Opening "Queen's gambit declined"]\n\n1.d4 d5 2.c4 e6 3.Nf3 c6`
      }
    },

    computed: {
      buttonText() {
        return this.isSubmitting ? "Importing..." : "Import PGN"
      },
    },

    methods: {
      cleanedPgn() {
        return this.$refs.pgn.value.trim()
          .replace("0-0-0", "O-O-O")
          .replace("0-0", "O-O")
          .replace("‒", "-")
          .replace("–", "-")
          .replace("½-½", "1/2-1/2")
          .replace("0.5-0.5", "1/2-1/2")
      },
      importGame(e) {
        e.preventDefault()
        const pgn = this.cleanedPgn()
        if (!this.cjs.load_pgn(pgn)) {
          this.errorMessage = "Import failed. PGN is invalid!"
          return
        }
        this.isSubmitting = true
        const data = {
          game: {
            pgn,
          }
        }
        this.$store.dispatch('createGame', data).then(game => {
          router.push({ path: game.path })
          this.isSubmitting = false
        }).catch(error => {
          this.errorMessage = "Import failed. Server error!"
          this.isSubmitting = false
        })
      },
      updateBoardPosition() {
        this.errorMessage = ``
        if (this.cjs.load_pgn(this.cleanedPgn())) {
          this.fen = this.cjs.fen()
        }
      }
    },

    components: {
      PageTitle,
      SubHeader,
      Chessboard
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

  textarea
    width 560px
    height 336px
    font-size 16px
    line-height 21px
    padding 15px
    display block
    border 1px solid rgba(0,0,0,0.15)
    border-radius 2px

    &::placeholder
      color rgba(0,0,0,0.3)

  input[type="submit"]
    color white
    background highlight-color
    border none
    border-radius 2px
    font-size 17px
    padding 7px 0
    text-align center
    width 150px

    &:hover
      cursor pointer
      opacity 0.9

    &:disabled
      opacity 0.1

      &:hover
        cursor disabled

  .content
    display flex
    width 1200px
    margin-left 80px
    margin-bottom 30px
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
      margin-top 15px

      .error-message
        color orange
        margin-left 30px

</style>
