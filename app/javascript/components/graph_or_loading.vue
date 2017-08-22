<template lang="pug">
  .graph-or-loading
    evaluation-graph(
      v-if="!isLoading"
      :width="width"
      :height="height"
      :game="currentGame"
      :gameState="gameState"
      :clickedGraph="clickedGraph"
      :shouldModifyBoard="shouldModifyBoard"
    )
    .loading(v-if="isLoading")
      | Game analysis in progress... {{ progressText }}

</template>

<script>
  import { getGame, getGameStatus } from '../api/requests'
  import EvaluationGraph from './evaluation_graph'
  import Game from '../models/game'

  export default {
    props: {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      game: {
        type: Game,
        required: true,
      },
      gameState: {
        type: Object,
        required: true,
      },
      clickedGraph: {
        type: Function,
        default: function() {}
      },
      shouldModifyBoard: {
        type: Boolean,
        default: false
      },
    },

    data() {
      return {
        currentGame: this.game,
        percentComplete: null,
        periodicFetcher: null,
      }
    },

    mounted() {
      if (!this.isLoading) {
        return
      }
      this.checkOrFetchGame()
      this.periodicFetcher = setInterval(() => {
        this.checkOrFetchGame()
      }, 7000)
    },

    methods: {
      checkOrFetchGame() {
        getGameStatus(this.game.id).then(response => {
          const percentComplete = response.data.game.percent
          if (percentComplete === 100) {
            this.fetchGame()
          } else {
            this.percentComplete = percentComplete
          }
        })
      },

      fetchGame() {
        getGame(this.game.id).then(response => {
          this.currentGame = new Game(response.data.game)
          if (this.periodicFetcher) {
            clearInterval(this.periodicFetcher)
          }
        })
      }
    },

    computed: {
      isLoading() {
        return !this.currentGame.scores.length
      },
      progressText() {
        if (!this.percentComplete) {
          return
        }
        return `${this.percentComplete}% done`
      }
    },

    components: {
      EvaluationGraph
    }
  }
</script>
