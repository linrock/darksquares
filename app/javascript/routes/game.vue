<template>
  <main id="game">
    <sub-header>
      <div>Game {{ id }}</div>
    </sub-header>
    <div class="sub-header-spacer"></div>

    <div class="content">
      <div class="left-content">
        <mini-board-detailed :showHeaderInfo="false" :squareSize="55"/>
      </div>

      <div class="right-content">
        <game-info v-if="game" :pgnHeaders="game.pgnHeaders"/>
        <div class="annotations-filter"></div>
        <move-list v-if="game" :game="game" :gameState="gameState"/>
        <div class="game-actions"></div>
      </div>
    </div>
  </main>
</template>

<script>
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameInfo from '../components/game_info'
  import MoveList from '../components/move_list'
  import SubHeader from '../components/sub_header'
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
      SubHeader,
      GameInfo,
      MiniBoardDetailed,
      MoveList
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    display flex
    width 1200px
    margin-top 30px
    margin-left 80px

    .left-content
      position fixed

    .right-content
      margin-left 510px

  .game-info
    margin-bottom 20px

  .annotations-filter
    border-bottom 1px solid rgba(0,0,0,0.05)
    margin-bottom 15px

  .game-actions
    margin-bottom: 200px

</style>
