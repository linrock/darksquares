<template lang="pug">
  .move-list
    template(v-for="(move, i) in game.moves")
      .move-num(v-if="showMoveNum(i)") {{ game.moveNum(i) }}
      .move
        .move-san(
          :class="highlight(i)"
          :id="moveId(i)"
          @click="setMoveIndex(i)"
        ) {{ move.san }}
        .move-actions
          img(
            src="/icons/comment-bubble.svg"
            class="comment-bubble"
            @click="toggleAnnotationInput(i)"
          )
      move-annotations(
        :annotations="game.annotationsAt(i)"
        :game="game"
      )
      annotation-input(
        v-if="$store.getters.annotationInputIndex === i"
        :game="game"
        :moveString="game.moveString(i)"
      )

</template>

<script>
  import MoveAnnotations from './move_annotations.vue'
  import AnnotationInput from './annotation_input.vue'
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
    },

    methods: {
      showMoveNum(i) {
        if (i > 0 && this.game.annotationsAt(i - 1)) {
          return true
        }
        return (i - 1) === this.$store.getters.annotationInputIndex || i % 2 === 0
      },
      toggleAnnotationInput(i) {
        if (!this.$store.getters.username) {
          this.$store.dispatch('openModal')
          return
        }
        const annotationInputIndex = this.$store.getters.annotationInputIndex
        this.$store.dispatch('setAnnotationInputIndex', annotationInputIndex === i ? -1 : i)
        this.setMoveIndex(i)
      },
      setMoveIndex(i) {
        this.$store.dispatch('setPositionIndex', i + 1)
      },
      highlight(i) {
        if (i + 1 === this.$store.getters.positionIndex) {
          return `highlighted`
        }
      },
      moveId(positionIndex) {
        return `move-${positionIndex + 1}`
      },
    },

    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    },

    components: {
      AnnotationInput,
      MoveAnnotations,
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .move-list
    font-size 14px
    clear both
    clearfix()

  .move-num
    float left
    font-weight bold
    line-height 26px
    width 30px
    clear left

  .move
    float left
    font-weight bold
    line-height 26px
    width 180px

    &:hover .comment-bubble
      opacity 0.5

    .move-san
      float left
      padding-left 20px
      width 80px

      &.highlighted
        background #ffff66

      &:hover
        cursor pointer

    .move-actions
      float left
      padding-left 10px
      width 60px

    .comment-bubble
      width 16px
      opacity 0
      position relative
      top 5px
      transition opacity 0.15s ease

      &:hover
        cursor pointer
        opacity 1

  .move-annotations
    clear left
    float left
    margin 10px 0 20px
    width 100%

    & + .annotation-input
      padding-top 0
      position relative
      top -20px

      & >>> input
        margin-top 0
        border-top 0

</style>
