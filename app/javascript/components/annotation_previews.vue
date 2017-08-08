<template lang="pug">
  .annotation-previews
    .preview(v-for="(annotation, i) in annotationPreviews")
      span.username {{ annotation.username }}
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
        const j = parseInt(moveString) * 2 - (moveString.indexOf("...") > 0 ? 0 : 1)
        console.log(`${moveString} - ${j}`)
        return `${this.game.path}#${j}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .preview
    font-size 12px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    margin 5px 0 10px
    color #333
    opacity 0.9
    clear left

    a
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

    .username
      font-weight bold

    .move-string
      margin 0 10px 0 7px
      opacity 0.7

    .text
      opacity 0.5

    &:last-child
      margin-bottom 0

</style>
