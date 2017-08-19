<template lang="pug">
  main#game
    sub-header
      div Game {{ id }}

    .content(v-if="game")
      section.left-side
        .left-side-inner
          mini-board-detailed(:squareSize="55")
          hover-graph-clickable(
            v-if="game.scores.length"
            :width="443"
            :height="120"
            :game="game"
            :gameState="gameState"
            :clickedGraph="scrollToMove"
          )
          .loading(v-if="!game.scores.length")
            | Game analysis in progress...

      section.right-side
        game-info(:pgnHeaders="game.pgnHeaders")
        .annotations-filter
        move-list(:game="game" :gameState="gameState")
        .game-actions

</template>

<script>
  import Mousetrap from 'mousetrap'
  import SubHeader from '../layouts/sub_header'
  import HoverGraphClickable from '../components/hover_graph_clickable.vue'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameInfo from '../components/game_info'
  import MoveList from '../components/move_list'
  import { resetBoardState, applyStateChange } from '../store/miniboard'
  import { getOrFetchGame } from '../store/games'
  import { isElementInViewport } from '../util'

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
        gameState,
        scrolledToMove: false
      }
    },

    created() {
      gameState.i = this.initialMoveIndex()
      resetBoardState()
      getOrFetchGame(this.id).then(game => {
        applyStateChange(game.stateAtPositionIndex(gameState.i))
        this.game = game
      })
    },

    mounted() {
      window.scrollTo(0, 0)
      Mousetrap.bind('left', () => {
        const i = this.gameState.i
        if (i > 0) {
          this.gameState.i -= 1
        }
      })
      Mousetrap.bind('right', () => {
        const i = this.gameState.i
        if (i < this.game.positions.length - 1) {
          this.gameState.i += 1
        }
      })
    },

    updated() {
      if (!this.scrolledToMove) {
        this.scrollToMoveIfFar(this.initialMoveIndex())
        this.scrolledToMove = true
      }
    },

    destroyed() {
      Mousetrap.reset()
    },

    watch: {
      i: function() {
        if (!this.scrolledToMove) {
          return
        }
        this.scrollToMoveIfFar(this.i)
        applyStateChange(this.game.stateAtPositionIndex(this.i))
      }
    },

    computed: {
      i: function() {
        return this.gameState.i
      },
    },

    methods: {
      initialMoveIndex() {
        const hash = window.location.hash
        if (hash) {
          const i = Number(hash.replace(/#/, ''))
          if (Number.isInteger(i)) {
            return i
          }
        }
        return 0
      },
      moveEl(i) {
        return this.$el.querySelector(`#move-${i}`)
      },
      scrollToMove(i) {
        const offsetTop = this.moveEl(i).offsetTop
        window.scrollTo(0, offsetTop - 250)
      },
      scrollToMoveIfFar(i) {
        if (i === 0) {
          window.scrollTo(0, 0)
          return
        }
        if (isElementInViewport(this.moveEl(i))) {
          return
        }
        this.scrollToMove(i)
      }
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
  main
    overflow-x hidden

  .content
    display flex
    width 1200px
    margin-left 80px

  section.left-side
    position fixed
    top 0
    padding-top 30px + 76px
    padding-bottom 15px
    width 480px
    height 100%
    overflow-y auto

    .left-side-inner
      width 443px

      .hover-graph-clickable
        margin-top 25px

      .loading
        font-size 16px
        color rgba(0,0,0,0.4)
        margin-top 30px

  section.right-side
    padding 30px 0 0 40px
    margin-left 480px
    border-left 1px solid rgba(0,0,0,0.07)
    width 530px

    .game-info
      margin-bottom 20px

    .annotations-filter
      border-bottom 1px solid rgba(0,0,0,0.05)
      margin-bottom 15px

    .game-actions
      margin-bottom: 200px

</style>
