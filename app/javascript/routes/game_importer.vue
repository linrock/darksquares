<template>
  <div id="game-importer">
    <div class="container">
      <div class="left-content">
        <mini-board :fen="boardState.fen"/>
      </div>

      <div class="right-content">
        <form @submit="importGame">
          <textarea class="pgn-importer"></textarea>
          <input type="submit" value="Import PGN"/>
          <input type="checkbox"> Submit this game to the homepage
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Chess from 'chess.js'
  import { state } from '../store/miniboard'
  import MiniBoard from '../components/mini_board.vue'
  import { createGame } from '../api/requests'
  import { getAccessToken } from '../store/local_storage'

  export default {
    beforeRouteEnter: function(to, from, next) {
      if (getAccessToken()) {
        next()
      } else {
        next({ path: "/login" })
      }
    },
    data: function() {
      return {
        boardState: state
      }
    },

    methods: {
      importGame: function(e) {
        e.preventDefault()
        const pgn = this.$el.querySelector(`.pgn-importer`).value
        const cjs = new Chess()
        if (cjs.load_pgn(pgn)) {
          const data = {
            game: {
              pgn: pgn
            }
          }
          createGame(data).then(response => {
            console.log("yay, game uploaded!")
          })
        } else {
          console.log("pgn is invalid!")
        }
      },
    },

    components: {
      MiniBoard
    }
  }
</script>

<style lang="scss" scoped>
  #game-importer {
    display: flex;
  }

  .container {
    width: 1040px;
    margin: 0 auto;
    display: flex;
  }

  textarea {
    width: 500px;
    height: 500px;
    font-size: 16px;
    padding: 10px;
    display: block;
  }

  input[type="submit"] {
    color: white;
    background: black;
  }
</style>
