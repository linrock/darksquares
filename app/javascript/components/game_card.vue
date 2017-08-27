<template lang="pug">
  .game-card(:class="[{ previewing: isPreviewing }]")
    game-info(:pgnHeaders="game.pgnHeaders")
    .graph-container(@mouseenter="previewGame")
      router-link(
        :to="gamePositionPath"
      )
        graph-or-loading(
          :width="600"
          :height="150"
          :game="game"
          :gameState="gameState"
        )
    .annotations-container(v-if="game.annotations.length")
      annotation-previews(:game="game")
      router-link(:to="game.path")
        .more-annotations(v-if="annotationsRemaining")
          | View {{ annotationsRemaining }} more annotations

</template>

<script>
  import GameInfo from './game_info.vue'
  import GraphOrLoading from './graph_or_loading.vue'
  import EvaluationGraph from './evaluation_graph.vue'
  import AnnotationPreviews from './annotation_previews.vue'
  import Game from '../models/game'
  import { boardState } from '../store/miniboard'
  import { activeGame } from '../store/active_game'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      isPreviewing: Boolean
    },

    data() {
      return {
        boardState,
        gameState: {
          i: 0,
        },
      }
    },

    methods: {
      previewGame() {
        this.boardState.pgn = this.game.pgn
        this.boardState.pgnHeaders = this.game.pgnHeaders
        activeGame.setKey(this.game.key)
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
      GraphOrLoading,
      AnnotationPreviews,
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .game-card
    card()

  a
    color inherit
    display block
    text-decoration none

    &:hover .more-annotations
      text-decoration underline

  .graph-or-loading >>> .loading
    font-size 14px
    color rgba(0,0,0,0.4)
    padding 12px 0

  .more-annotations
    color highlight-color
    font-size 12px
    margin-top 15px

  .game-info
    padding 15px 20px 0

  .graph-container
    padding 0 20px 5px

  .annotations-container
    background rgba(0,0,0,0.02)
    padding 15px 20px

</style>
