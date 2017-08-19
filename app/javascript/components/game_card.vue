<template lang="pug">
  .game-card
    .graph-container(@mouseenter="setCurrentPgn")
      game-info(:pgnHeaders="game.pgnHeaders")
      router-link(:to="gamePositionPath")
        hover-graph-clickable(v-if="game.scores.length"
                              :width="600" :height="150"
                              :game="game" :gameState="gameState"
                              :shouldModifyBoard="true")
        .loading(v-if="!game.scores.length")
          | Analysis in progress...

    .annotations-container(v-if="game.annotations.length")
      annotation-previews(:game="game")
      router-link(:to="game.path")
        .annotation-count(v-if="annotationsRemaining")
          | View {{ annotationsRemaining }} more annotations

</template>

<script>
  import GameInfo from './game_info.vue'
  import HoverGraphClickable from './hover_graph_clickable.vue'
  import AnnotationPreviews from './annotation_previews.vue'
  import Game from '../models/game'
  import { boardState } from '../store/miniboard'

  export default {
    props: {
      game: Game,
    },

    data() {
      return {
        boardState,
        gameState: {
          expanded: false,
          i: 0,
        },
      }
    },

    methods: {
      setCurrentPgn() {
        this.boardState.pgn = this.game.pgn
        this.boardState.pgnHeaders = this.game.pgnHeaders
      },
    },

    computed: {
      annotationsRemaining() {
        const remaining = this.game.annotations.length - 3
        if (remaining > 0) {
          return remaining
        }
      },
      gamePositionPath() {
        return `${this.game.path}#${this.gameState.i}`
      }
    },

    components: {
      GameInfo,
      HoverGraphClickable,
      AnnotationPreviews,
    }
  }
</script>

<style lang="stylus" scoped>
  .game-card
    background white
    position relative
    width 640px

  a
    color inherit
    text-decoration none

    &:hover .annotation-count
      opacity 0.9
      text-decoration underline

  .loading
    font-size 14px
    color rgba(0,0,0,0.4)
    padding 12px 0

  .annotation-count
    color rgb(58,137,201)
    opacity 0.8
    font-size 12px
    margin-top 15px

  .graph-container
    padding 15px 20px 5px

  .annotations-container
    background rgba(0,0,0,0.02)
    padding 15px 20px

</style>
