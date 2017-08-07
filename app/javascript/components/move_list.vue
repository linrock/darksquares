<template>
  <div class="move-list">
    <template v-for="(move, i) in game.moves">
      <div class="move-num" v-if="showMoveNum(i)">{{ moveNum(i) }}</div>
      <div class="move">
        <div class="move-san" :style="isHighlighted(i)"
             @click="clickedMoveIndex(i)">{{ move.san }}</div>
        <div class="move-actions">
          <img src="/assets/comment-bubble.svg" class="comment-bubble"
               @click="toggleAnnotationInput(i)">
        </div>
      </div>
      <annotation-text v-if="annotationMap[moveString(i)]"
                       v-for="annotation in annotationMap[moveString(i)]"
                       :key="annotation.id"
                       :annotation="annotation"/>
      <form v-if="shouldShowAnnotationInput(i)" @submit="createAnnotation">
        <input class="annotation-input" type="text" :placeholder="annotationInputPlaceholder(i)"
               ref="annotationInput" v-focus/>
      </form>
    </template>
  </div>
</template>

<script>
  import AnnotationText from './annotation_text.vue'
  import Game from '../models/game'
  import Annotation from '../models/annotation'
  import { createAnnotation } from '../api/requests'
  import { getUsername } from '../store/local_storage'
  import { groupBy } from '../util'

  export default {
    props: {
      game: Game,
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
      shouldShowAnnotationInput: function(i) {
        return i === this.annotationInputIndex
      },
      toggleAnnotationInput: function(i) {
        this.annotationInputIndex = this.annotationInputIndex === i ? -1 : i
        this.gameState.i = i + 1
        if (this.annotationInputIndex > -1) {
          setTimeout(() => this.$refs.annotationInput[0].focus(), 500)
        }
      },
      annotationInputPlaceholder: function(i) {
        return `Write an annotation for ${this.moveString(i)}`
      },
      moveString: function(i) {
        return `${this.moveNum(i)} ${this.game.moves[i].san}`
      },
      clickedMoveIndex: function(i) {
        this.gameState.i = i + 1
      },
      createAnnotation: function(ev) {
        ev.preventDefault()
        const annotationInput = this.$refs.annotationInput[0]
        const annotation = new Annotation({
          username: getUsername(),
          move_string: this.moveString(this.annotationInputIndex),
          text: annotationInput.value
        })
        this.game.annotations.push(annotation)
        createAnnotation(this.game.id, annotation)
        annotationInput.value = ''
        this.annotationInputIndex = -1
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
      AnnotationText
    }
  }
</script>

<style lang="scss" scoped>
  @mixin clearfix {
    &:before, &:after {
      display: table;
      content: "";
    }

    &:after {
      clear: both;
    }
  }

  .move-list {
    font-size: 14px;
    clear: both;
    @include clearfix;
  }

  .move-num {
    float: left;
    font-weight: bold;
    line-height: 26px;
    width: 30px;
    clear: left;
  }

  .move {
    float: left;
    font-weight: bold;
    line-height: 26px;
    width: 180px;

    &:hover .comment-bubble {
      opacity: 0.5;
    }

    .move-san {
      float: left;
      padding-left: 20px;
      width: 80px;

      &:hover {
        cursor: pointer;
      }
    }

    .move-actions {
      float: left;
      padding-left: 10px;
      width: 60px;
    }

    .comment-bubble {
      width: 16px;
      opacity: 0;
      position: relative;
      top: 5px;
      transition: opacity 0.15s ease;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }

  .annotation {
    float: left;
    clear: left;
    color: rgba(0,0,0,0.8);
    margin: 10px 0;
    font-size: 14px;
    line-height: 20px;
    width: 600px;

    p {
      margin: 0;
    }
  }

  .annotation-input {
    float: left;
    clear: left;
    margin: 10px 0;
    font-size: 14px;
    width: 400px;
    padding: 3px;
  }
</style>
