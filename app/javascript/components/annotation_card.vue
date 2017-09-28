<template lang="pug">
  .annotation-card-container
    header
      span created by
      span.created-by
        router-link(:to="userPath") {{ annotation.username }}
      span {{ annotation.timeAgo }}

    router-link.linked-card(:to="gamePath")
      .annotation-card(
        @mouseenter="previewAnnotatedGame"
        :class="[{ previewing: isPreviewing }]"
      )
        .move-string {{ annotation.move_string }}
        .text
          annotation-text-basic(:annotation="annotation")
        .annotator(v-if="annotation.annotator") &ndash; {{ annotation.annotator }}

</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'
  import AnnotationTextBasic from './annotation_text_basic'
  import { applyStateChange } from '../store/miniboard'

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
        applyStateChange({
          fen: this.annotation.fen,
          highlights: [this.annotation.move.from, this.annotation.move.to],
          move: this.annotation.move_string,
          pgnHeaders: this.annotation.pgnHeaders || {},
          bestMove: ``,
          score: ``
        })
        this.$store.dispatch(`setActiveItemKey`, this.annotation.key)
        this.$store.dispatch(`setActiveGameId`, {
          id: this.annotation.gameId,
          resetPositionIndex: true
        })
      },
    },

    computed: {
      userPath() {
        return `/u/${this.annotation.username}`
      },
      gamePath() {
        const i = Game.moveStringToPositionIndex(this.annotation.move_string)
        return `/g/${this.annotation.gameId}#${i}`
      }
    },

    components: {
      AnnotationTextBasic
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .annotation-card-container
    margin-left 60px

  header
    color rgba(0,0,0,0.4)
    font-size 12px
    margin-bottom 8px
    margin-left 3px
    
  .created-by
    font-weight bold
    margin 0 5px

    a
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

  .linked-card
    color inherit
    display block
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

    .annotator
      color rgba(0,0,0,0.3)
      font-size 12px
      margin-top 12px

</style>
