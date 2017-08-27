<template>
  <div class="move-list">
    <template v-for="(move, i) in game.moves">
      <div class="move-num" v-if="showMoveNum(i)">{{ game.moveNum(i) }}</div>
      <div class="move">
        <div class="move-san" :class="highlight(i)" :id="moveId(i)"
             @click="updateMoveIndex(i)">{{ move.san }}</div>
        <div class="move-actions">
          <img src="/assets/comment-bubble.svg" class="comment-bubble"
               @click="toggleAnnotationInput(i)">
        </div>
      </div>
      <div class="annotations" v-if="game.annotationsAt(i)">
        <annotation v-for="annotation in game.annotationsAt(i)"
                    :key="annotation.id"
                    :annotation="annotation"
                    :game="game"/>
      </div>
      <annotation-input v-if="annotationInputIndex === i"
                        :game="game" :moveString="game.moveString(i)"
                        @annotation-created="annotationInputIndex = -1"/>
    </template>
  </div>
</template>

<script>
  import Annotation from './annotation.vue'
  import AnnotationInput from './annotation_input.vue'
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      gameState: {
        type: Object,
        required: true
      }
    },

    data: function() {
      return {
        annotationInputIndex: -1,
      }
    },

    methods: {
      showMoveNum(i) {
        if (i > 0 && this.game.annotationsAt(i - 1)) {
          return true
        }
        return (i - 1) === this.annotationInputIndex || i % 2 === 0
      },
      toggleAnnotationInput(i) {
        this.annotationInputIndex = this.annotationInputIndex === i ? -1 : i
        this.updateMoveIndex(i)
      },
      updateMoveIndex(i) {
        this.gameState.i = i + 1
      },
      highlight(i) {
        if (i + 1 === this.gameState.i) {
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
      Annotation,
      AnnotationInput,
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

  .annotations
    clear left
    float left
    margin 10px 0 15px
    width 100%
    border 1px solid #f3f3f3
    border-radius 2px

    & + .annotation-input
      margin-top -15px
      position relative

      & >>> input
        margin-top 0
        border-top 0

</style>
