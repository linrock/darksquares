<template>
  <div id="game">
    <header class="sub-header">
      <div>Game {{ id }}</div>
    </header>

    <div class="content">
      <div class="left-content">
        <mini-board-detailed :showHeaderInfo="false"/>
      </div>

      <div class="right-content">
        <game-info v-if="game" :pgnHeaders="game.pgnHeaders"/>
        <move-list v-if="game" :game="game" :gameState="gameState"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameInfo from '../components/game_info'
  import MoveList from '../components/move_list'
  import Game from '../models/game'
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
      getGame(this.id).then(response => {
        this.game = new Game(response.data)
      })
    },

    components: {
      GameInfo,
      MiniBoardDetailed,
      MoveList
    }
  }
</script>

<style lang="stylus" scoped>
  .sub-header
    background rgba(0,0,0,0.05)
    padding 10px 0 10px 80px
    width: 100%

  .content
    display flex
    width 1200px
    margin-left 80px

  .game-info
    margin-bottom 20px

  .right-content
    margin-left 80px
</style>
