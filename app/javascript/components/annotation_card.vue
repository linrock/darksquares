<template lang="pug">
  .annotation-card-container
    header
      span annotated by
      span.annotator
        router-link(:to="userPath") {{ annotation.username }}
      span {{ annotation.timeAgo }}

    router-link.linked-card(:to="gamePath")
      .annotation-card(
        @mouseenter="previewAnnotatedGame"
        :class="[{ previewing: isPreviewing }]"
      )
        .move-string {{ annotation.move_string }}
        .text {{ annotation.text }}

</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'
  import { boardState } from '../store/miniboard'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      },
      isPreviewing: Boolean
    },

    methods: {
      previewAnnotatedGame() {
        boardState.fen = this.annotation.fen
        boardState.highlights = [this.annotation.move.from, this.annotation.move.to]
        boardState.move = this.annotation.move_string
        boardState.pgnHeaders = this.annotation.game.pgnHeaders || {}
        this.$emit(`previewing`, this.annotation.key)
      },
    },

    computed: {
      userPath() {
        return `/u/${this.annotation.username}`
      },
      gamePath() {
        const i = Game.moveStringToPositionIndex(this.annotation.move_string)
        return `/games/${this.annotation.gameId}#${i}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  header
    color rgba(0,0,0,0.4)
    font-size 12px
    margin-bottom 8px
    margin-left 3px
    
  .annotator
    font-weight bold
    margin 0 5px

    a
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

  .linked-card
    color inherit
    text-decoration none

  .annotation-card
    font-size 14px
    line-height 18px
    padding 15px 20px
    card()

    .move-string
      font-weight bold
      margin-bottom 12px

    .text
      color rgba(0,0,0,0.7)

</style>
