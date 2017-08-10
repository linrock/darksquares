<template lang="pug">
  main#home
    .background
      .left-content
        mini-board-detailed(:showPgn="true" :showHeaderInfo="false")

        .container
          header
            h1 Recent games
            .instructions
              | Hover over the graphs to explore game positions.
              | Click to view the position in depth.

          game-list(:games="games")

</template>

<script>
  import Chess from 'chess.js'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameList from '../components/game_list.vue'
  import Game from '../models/game'
  import { loadHomeGames, gameIdLists, gamesMap } from '../store/games'

  window.Chess = Chess

  export default {
    data() {
      return {
        gameIdLists
      }
    },

    created() {
      if (gameIdLists.home.length) {
        return
      }
      loadHomeGames()
    },

    computed: {
      games() {
        return this.gameIdLists.home.map(id => gamesMap[id])
      }
    },

    components: {
      GameList,
      MiniBoardDetailed,
    }
  }
</script>

<style lang="scss" scoped>
  @mixin clearfix {
    &:before, &:after {
      display: table;
      content: "";
    }

    &:after {
      clear: both;
    }
  }

  .shadowed {
    box-shadow: 0 0 5px rgba(0,0,0,0.15);
  }

  .background {
    background: #eee;
    width: 100%;
    height: 100%;
    min-height: 1000px;

    .left-content {
      background: white;
      width: 420px;
      height: 100%;
      min-height: 1000px;
    }
  }

  .mini-board-view {
    position: fixed;
    top: 70px;
    left: 35px;
    width: 338px;

    .game-info {
      margin-bottom: 17px;
    }

    .position-info {
      margin-top: 10px;
      @include clearfix;

      .game-position {
        float: left;
      }

      .position-evaluation {
        float: right;
      }
    }
  }

  .container {
    width: 700px;
    margin-left: 450px;
    border-left: 1px solid #eee;

    header {
      padding-left: 25px;
      border-bottom: 1px solid #eee;
      width: 640px;
      background: white;
    }
  }

  h1 {
    color: #292929;
    font-size: 20px;
    padding: 60px 0 10px;
    margin: 0;
  }

  .description {
    font-size: 14px;
    line-height: 20px;
    width: 640px;

    .contender {
      margin: 30px 0;
    }
  }

  .instructions {
    font-size: 12px;
    margin: 10px 0 20px;
    font-weight: bold;
    color: rgba(0,0,0,0.3);
  }
</style>
