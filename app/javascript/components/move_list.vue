<template>
  <div class="move-list">
    <template v-for="(move, i) in moves">
      <div class="move-num" v-if="showMoveNum(i)">{{ moveNum(i) }}</div>
      <div class="move">
        <div class="move-san" :style="isHighlighted(i)"
             @click="clickedMoveIndex(i)">{{ move.san }}</div>
        <div class="move-actions">
          <img src="/assets/comment-bubble.svg" class="comment-bubble"
               @click="toggleAnnotationInput(i)">
        </div>
      </div>
      <annotation v-if="annotations[i]" v-for="annotation in annotations[i]" :annotation="annotation"/>
      <form v-if="annotationInputIndex === i" @submit="createAnnotation">
        <input class="annotation-input" type="text" :placeholder="annotationInputPlaceholder(i)"
               ref="annotationInput" v-focus/>
      </form>
    </template>
  </div>
</template>

<script>
  import Annotation from './annotation.vue'
  import { createAnnotation } from '../api_client'

  export default {
    props: {
      moves: Array,
      annotations: Array,
      gameState: Object,
    },

    data: function() {
      return {
        annotationInputIndex: -1,
      }
    },

    methods: {
      showMoveNum: function(i) {
        return (i - 1) === this.annotationInputIndex || this.annotations[i - 1] || i % 2 === 0
      },
      moveNum: function(i) {
        return `${~~(i / 2 + 1)}.${i % 2 === 0 ? '' : '..'}`
      },
      toggleAnnotationInput: function(i) {
        this.annotationInputIndex = this.annotationInputIndex === i ? -1 : i
        this.gameState.i = i + 1
        if (this.annotationInputIndex > -1) {
          setTimeout(() => this.$refs.annotationInput[0].focus(), 50)
        }
      },
      annotationInputPlaceholder: function(i) {
        return `Write an annotation for ${this.moveNum(i)} ${this.moves[i].san}`
      },
      clickedMoveIndex: function(i) {
        this.gameState.i = i + 1
      },
      createAnnotation: function(ev) {
        ev.preventDefault()
        const annotationInput = this.$refs.annotationInput[0]
        const annotation = annotationInput.value
        this.$emit(`createdAnnotation`, {
          annotation: {
            username: `flamehead`,
            text: annotation,
          },
          i: this.annotationInputIndex,
        })
        createAnnotation(gameState.id, {
          text: annotation
        })
        annotationInput.value = ''
        this.annotationInputIndex = -1
      },
      isHighlighted: function(i) {
        if (i + 1 === this.gameState.i) {
          return `background: #ffff66`
        }
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
      Annotation
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
    width: 150px;

    &:hover .comment-bubble {
      opacity: 0.5;
    }

    .move-san {
      float: left;
      padding-left: 20px;
      width: 60px;

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
