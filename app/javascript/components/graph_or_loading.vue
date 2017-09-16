<template lang="pug">
  .graph-or-loading
    evaluation-graph(
      v-if="!isLoading"
      :width="width"
      :height="height"
      :game="currentGame"
      :clickedGraph="clickedGraph"
    )
    .loading(v-if="isLoading")
      template(v-if="!analysisStatus || analysisStatus === `pending`")
        | Waiting for server to start analyzing game...
      template(v-if="analysisStatus === `in_progress`")
        | Analyzing game... {{ progressText }}

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
      clickedGraph: {
        type: Function,
        default: function() {}
      },
    },

    data() {
      return {
        currentGame: this.game,
        analysisStatus: null,
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

    destroyed() {
      clearInterval(this.periodicFetcher)
    },

    methods: {
      checkOrFetchGame() {
        getGameStatus(this.game.id).then(response => {
          const analysisStatus = response.data.game.status
          const percentComplete = response.data.game.percent
          if (percentComplete === 100 && analysisStatus === 'complete') {
            this.fetchGame()
          } else {
            this.analysisStatus = analysisStatus
            this.percentComplete = percentComplete
          }
        })
      },

      fetchGame() {
        this.$store.dispatch('fetchGame', this.game.id).then(game => {
          this.currentGame = game
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
        return this.percentComplete && `${this.percentComplete}% complete`
      }
    },

    components: {
      EvaluationGraph
    }
  }
</script>
