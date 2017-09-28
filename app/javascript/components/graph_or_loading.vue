<template lang="pug">
  .graph-or-loading
    evaluation-graph-click(
      v-if="graphMode === `click`"
      :width="width"
      :height="height"
      :game="currentGame"
      :clickedGraph="clickedGraph"
    )
    evaluation-graph(
      v-else
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
  import { getGameStatus } from '../api/requests'
  import EvaluationGraph from './evaluation_graph'
  import EvaluationGraphClick from './evaluation_graph_click'
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
      graphMode: {
        type: String,
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
      this.periodicFetcher = setInterval(() => this.checkOrFetchGame(), 7000)
    },

    destroyed() {
      if (this.periodicFetcher) {
        clearInterval(this.periodicFetcher)
      }
    },

    methods: {
      checkOrFetchGame() {
        getGameStatus(this.game.id).then(response => {
          this.analysisStatus = response.data.game.status
          this.percentComplete = response.data.game.percent
          if (this.percentComplete === 100 && this.analysisStatus === 'complete') {
            this.fetchGame()
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
        const scores = this.currentGame.scores
        return !scores.length || scores.filter(score => score !== 0).length === 0
      },
      progressText() {
        return this.percentComplete && `${this.percentComplete}% complete`
      }
    },

    components: {
      EvaluationGraph,
      EvaluationGraphClick
    }
  }
</script>

<style lang="stylus" scoped>
  .graph-or-loading
    position relative

    .loading
      color rgba(0,0,0,0.25)
      font-size 14px
      position absolute
      pointer-events none
      top 25px

</style>
