<template>
  <article>
    <div class="background">
      <div class="left-content shadowed">
        <mini-board-detailed :showPgn="true" :showHeaderInfo="false"/>

        <div class="container">
          <header class="shadowed">
            <h1>Annotated games</h1>

            <div class="instructions">
              Hover over the graphs to explore positions.
              Click to view the move list and annotations.
            </div>
          </header>

          <game-list :games="games"/>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import Chess from 'chess.js'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameList from '../components/game_list.vue'
  import Game from '../models/game'
  import { getGames } from '../api/requests'

  window.Chess = Chess

  export default {
    data: function() {
      return {
        games: window.data ? Game.loadGamesFromData(window.data) : []
      }
    },

    created() {
      if (this.games.length > 0) {
        return
      }
      getGames().then(response => {
        window.data = response.data
        this.games = Game.loadGamesFromData(window.data)
      })
    },

    components: {
      GameList,
      MiniBoardDetailed,
    }
  }
</script>

<style lang="scss">
  @mixin clearfix {
    &:before, &:after {
      display: table;
      content: "";
    }

    &:after {
      clear: both;
    }
  }

  body {
    margin: 0;
    width: 100%;
    height: 100%;
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
    width: 800px;
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
