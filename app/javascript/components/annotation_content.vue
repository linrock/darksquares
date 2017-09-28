<template lang="pug">
  .annotation-content
    annotation-text-basic(:annotation="annotation")
    .annotation-info
      template(v-if="!annotation.annotator")
        span.author
          router-link.username(:to="userPath" v-if="showUsername(annotation)")
            | {{ annotation.username }}
          span.time-ago {{ annotation.editedTimeAgo }}
      template(v-if="annotation.annotator")
        span.annotator
          span.prefix &ndash;
          | {{ annotation.annotator }}
      annotation-commands(
        v-if="canModifyAnnotation"
        :annotation="annotation"
        :game="game"
      )

</template>

<script>
  import AnnotationTextBasic from './annotation_text_basic'
  import AnnotationCommands from './annotation_commands'
  import Annotation from '../models/annotation'
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      annotation: {
        type: Annotation,
        required: true
      }
    },

    methods: {
      showUsername(annotation) {
        return annotation.username && annotation.username !== ``
      },
    },

    computed: {
      userPath() {
        return `/u/${this.annotation.username}`
      },
      canModifyAnnotation() {
        const username = this.$store.getters.username
        return username === this.annotation.username || username === this.game.username
      },
    },

    components: {
      AnnotationTextBasic,
      AnnotationCommands
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

  .annotation-content
    display block
    color rgba(0,0,0,0.9)
    font-size 14px
    line-height 20px
    padding 12px 18px
    width 100%

    &:hover .annotation-commands
      opacity 1

  .annotation-text
    display inline

  .annotation-info
    font-size 11px
    white-space nowrap
    margin-top 6px
    display flex

    .prefix
      display inline
      margin-right 4px

    .author
      .username
        color highlight-color
        display inline
        opacity 0.9
        text-decoration none

        &:hover
          text-decoration underline

      .time-ago
        display inline
        margin-left 6px
        opacity 0.2

    .annotator
      color rgba(0,0,0,0.3)

  .annotation-commands
    opacity 0
    transition 0.5s opacity 0.15s ease

</style>
