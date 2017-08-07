<template lang="pug">
  main#game
    sub-header
      div Game {{ id }}

    .content(v-if="game")
      section.left-side
        mini-board-detailed(:showHeaderInfo="false" :squareSize="55")
        hover-graph-clickable(:width="443" :height="120" :game="game" :gameState="gameState")

      section.right-side
        game-info(:pgnHeaders="game.pgnHeaders")
        .annotations-filter
        move-list(:game="game" :gameState="gameState")
        .game-actions

</template>

<script>
  import Mousetrap from 'mousetrap'
  import SubHeader from '../components/sub_header'
  import HoverGraphClickable from '../components/hover_graph_clickable.vue'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameInfo from '../components/game_info'
  import MoveList from '../components/move_list'
  import Game from '../models/game'
  import { resetBoardState } from '../store/miniboard'
  import { getGame } from '../api/requests'

  export default {
    props: {
      id: String
    },

    data: function() {
      return {
        game: null,
        gameState: {
          i: 0
        }
      }
    },

    created() {
      resetBoardState()
      getGame(this.id).then(response => {
        this.game = new Game(response.data)
      })
    },

    mounted() {
      Mousetrap.bind('left', () => {
        if (this.gameState.i > 0) {
          this.gameState.i -= 1
        }
      })
      Mousetrap.bind('right', () => {
        if (this.gameState.i < this.game.positions.length) {
          this.gameState.i += 1
        }
      })
    },

    destroyed() {
      Mousetrap.reset()
    },

    components: {
      SubHeader,
      GameInfo,
      MoveList,
      HoverGraphClickable,
      MiniBoardDetailed,
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    display flex
    width 1200px
    margin-left 80px

  section.left-side
    position fixed
    padding-top 30px

    .hover-graph-clickable
      margin-top 25px

  section.right-side
    padding 30px 0 0 40px
    margin-left 480px
    border-left 1px solid rgba(0,0,0,0.07)

    .game-info
      margin-bottom 20px

    .annotations-filter
      border-bottom 1px solid rgba(0,0,0,0.05)
      margin-bottom 15px

    .game-actions
      margin-bottom: 200px

</style>
