<template lang="pug">
  .annotation-previews
    .preview(v-for="(annotation, i) in annotationPreviews")
      template(v-if="annotation.annotator")
        span.annotator {{ annotation.annotator }}
      template(v-if="!annotation.annotator")
        router-link(:to="userPath(annotation.username)").username {{ annotation.username }}
      router-link(:to="gamePositionPath(annotation.move_string)")
        span.move-string {{ annotation.move_string }}
      span.text {{ annotation.text }}

</template>

<script>
  import Game from '../models/game'

  export default {
    props: {
      game: Game
    },

    computed: {
      annotationPreviews: function() {
        let previews = []
        for (let j = 0, l = this.game.annotations.length; j < l; j++) {
          if (this.game.annotations[j]) {
            previews.push(this.game.annotations[j])
            if (previews.length >= 3) {
              break
            }
          }
        }
        return previews
      },
    },

    methods: {
      gamePositionPath: function(moveString) {
        const j = Game.moveStringToPositionIndex(moveString)
        return `${this.game.path}#${j}`
      },
      userPath: function(username) {
        return `/u/${username}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .preview
    font-size 12px
    line-height 14px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    margin 4px 0 9px
    color #9c9c9c
    clear left

    a
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

    .move-string
      color #555
      margin-right 7px

    .annotator
      color #333
      margin-right 7px

    .username
      color highlight-color
      margin-right 7px

    &:last-child
      margin-bottom 0

</style>
