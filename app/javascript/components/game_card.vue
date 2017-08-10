<template lang="pug">
  .game-card
    .graph-container(@mouseenter="setCurrentPgn")
      game-info(:pgnHeaders="game.pgnHeaders")
      router-link(:to="gamePositionPath")
        hover-graph-clickable(:width="600" :height="150"
                              :game="game" :gameState="gameState")

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
  import { state } from '../store/miniboard'

  export default {
    props: {
      game: Game,
    },

    data: function() {
      return {
        boardState: state,
        gameState: {
          expanded: false,
          i: 0,
        },
      }
    },

    methods: {
      setCurrentPgn: function() {
        this.boardState.pgn = this.game.pgn
        this.boardState.pgnHeaders = this.game.pgnHeaders
      },
    },

    computed: {
      annotationsRemaining: function() {
        const remaining = this.game.annotations.length - 3
        if (remaining > 0) {
          return remaining
        }
      },
      gamePositionPath: function() {
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
    position relative

  a
    text-decoration none

    &:hover .annotation-count
      opacity 0.9
      text-decoration underline

  .collapse-game-button
    top 5px
    right 5px
    position absolute
    z-index 1

    &:hover
      cursor pointer

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
