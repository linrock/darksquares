<template lang="pug">
  .game-card
    .graph-container( @mouseenter="setCurrentPgn" )
      game-info( :pgnHeaders="game.pgnHeaders" )
      hover-graph-clickable( :width="600" :height="150" :game="game" :gameState="gameState" )

    annotation-previews( :annotations="game.annotations" )

    .annotation-count( v-if="annotationsRemaining" )
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

  .collapse-game-button
    top 5px
    right 5px
    position absolute
    z-index 1

    &:hover
      cursor pointer

  .annotation-count
    color rgba(58,137,201,0.8)
    font-size 12px
    margin-top 15px

</style>
