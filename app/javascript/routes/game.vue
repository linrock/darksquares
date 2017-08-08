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
  import { resetBoardState, applyStateChange } from '../store/miniboard'
  import { getOrFetchGame } from '../store/games'

  const gameState = {
    i: 0
  }

  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },

    data: function() {
      return {
        game: null,
        gameState
      }
    },

    created() {
      const hash = window.location.hash
      if (hash) {
        const i = Number(hash.replace(/#/, ''))
        if (Number.isInteger(i)) {
          gameState.i = i
        }
      }
      resetBoardState()
      getOrFetchGame(this.id).then(game => {
        applyStateChange(game.stateAtPositionIndex(gameState.i))
        this.game = game
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
