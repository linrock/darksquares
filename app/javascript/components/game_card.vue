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
        )
    .annotations-container(v-if="game.annotations.length")
      annotation-previews(:game="game")
      router-link(:to="game.path")
        .more-annotations(v-if="annotationsRemaining")
          | View {{ annotationsRemaining }} more {{ pluralizedAnnotationLabel }}

</template>

<script>
  import GameInfo from './game_info.vue'
  import GraphOrLoading from './graph_or_loading.vue'
  import EvaluationGraph from './evaluation_graph.vue'
  import AnnotationPreviews from './annotation_previews.vue'
  import Game from '../models/game'
  import { applyStateChange } from '../store/miniboard'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      isPreviewing: Boolean
    },

    methods: {
      previewGame() {
        applyStateChange({
          pgnHeaders: this.game.pgnHeaders
        })
        this.$store.dispatch(`setActiveItemKey`, this.game.key)
        this.$store.dispatch(`setActiveGameId`, {
          id: this.game.id,
          resetPositionIndex: true
        })
      },
    },

    computed: {
      annotationsRemaining() {
        const remaining = this.game.annotations.length - 3
        if (remaining > 0) {
          return remaining
        }
      },
      pluralizedAnnotationLabel() {
        return this.annotationsRemaining === 1 ? `annotation` : `annotations`
      },
      gamePositionPath() {
        const i = this.$store.getters.positionIndex
        if (i > 0) {
          return `${this.game.path}#${i}`
        } else {
          return this.game.path
        }
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
  @require "../common.styl"

  .game-card
    card()

  a
    color inherit
    display block
    text-decoration none

    &:hover .more-annotations
      text-decoration underline

  .more-annotations
    color highlight-color
    font-size 12px
    font-weight bold
    margin-top 15px

  .game-info
    padding 15px 20px 0

  .graph-container
    padding 0 20px 5px

  .annotations-container
    background rgba(0,0,0,0.02)
    padding 15px 20px

</style>
