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
                    :game="game"
                    @edit-annotation="console.log('editing lol')"/>
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
      showMoveNum: function(i) {
        if (i > 0 && this.game.annotationsAt(i - 1)) {
          return true
        }
        return (i - 1) === this.annotationInputIndex || i % 2 === 0
      },
      toggleAnnotationInput: function(i) {
        this.annotationInputIndex = this.annotationInputIndex === i ? -1 : i
        this.updateMoveIndex(i)
      },
      updateMoveIndex: function(i) {
        this.gameState.i = i + 1
      },
      highlight: function(i) {
        if (i + 1 === this.gameState.i) {
          return `highlighted`
        }
      },
      moveId: function(positionIndex) {
        return `move-${positionIndex + 1}`
      },
    },

    directives: {
      focus: {
        inserted: function(el) {
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
  clearfix()
    &:before, &:after
      display table
      content ""
    &:after
      clear both

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
    width 600px
    border-radius 2px

  .annotation
    background rgba(0,0,0,0.03)
    color rgba(0,0,0,0.8)
    font-size 14px
    line-height 20px
    padding 10px

    p
      margin 0

</style>
