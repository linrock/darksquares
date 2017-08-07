<template>
  <div class="move-list">
    <template v-for="(move, i) in game.moves">
      <div class="move-num" v-if="showMoveNum(i)">{{ moveNum(i) }}</div>
      <div class="move">
        <div class="move-san" :style="isHighlighted(i)"
             @click="updateMoveIndex(i)">{{ move.san }}</div>
        <div class="move-actions">
          <img src="/assets/comment-bubble.svg" class="comment-bubble"
               @click="toggleAnnotationInput(i)">
        </div>
      </div>
      <div class="annotations" v-if="annotationMap[moveString(i)]">
        <annotation-text v-for="annotation in annotationMap[moveString(i)]"
                         :key="annotation.id"
                         :annotation="annotation"/>
      </div>
      <annotation-input v-if="annotationInputIndex === i"
                        :game="game" :moveString="moveString(i)"/>
      </form>
    </template>
  </div>
</template>

<script>
  import AnnotationInput from './annotation_input.vue'
  import AnnotationText from './annotation_text.vue'
  import Game from '../models/game'
  import { groupBy } from '../util'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      gameState: Object,
    },

    data: function() {
      return {
        annotationInputIndex: -1,
      }
    },

    methods: {
      showMoveNum: function(i) {
        if (i > 0 && this.annotationMap[this.moveString(i - 1)]) {
          return true
        }
        return (i - 1) === this.annotationInputIndex || i % 2 === 0
      },
      moveNum: function(i) {
        return `${~~(i / 2 + 1)}.${i % 2 === 0 ? '' : '..'}`
      },
      toggleAnnotationInput: function(i) {
        this.annotationInputIndex = this.annotationInputIndex === i ? -1 : i
        this.updateMoveIndex(i)
      },
      moveString: function(i) {
        return `${this.moveNum(i)} ${this.game.moves[i].san}`
      },
      updateMoveIndex: function(i) {
        this.gameState.i = i + 1
      },
      isHighlighted: function(i) {
        if (i + 1 === this.gameState.i) {
          return `background: #ffff66`
        }
      },
    },

    computed: {
      annotations: function() {
        return this.game.annotations
      },
      annotationMap: function() {
        return groupBy(this.annotations, 'move_string')
      }
    },

    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    },

    components: {
      AnnotationInput,
      AnnotationText
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
