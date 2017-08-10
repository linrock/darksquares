<template lang="pug">
  .game-card-header(v-if="metadata")
    span(v-if="metadata.name")
      span.game-card-name {{ metadata.name }}
      .separator &ndash;
    span(v-if="metadata.submitter")
      | submitted by
      span.game-submitter {{ metadata.submitter }}
      span.time-ago {{ metadata.timeAgo() }}
    span.commands
      span.delete(@click="deleteGame") x

</template>

<script>
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      }
    },

    methods: {
      deleteGame() {
        deleteGame(this.game)
      }
    },

    computed: {
      metadata: function() {
        return this.game.metadata
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .game-card-header
    color rgba(0,0,0,0.4)
    font-size 12px
    margin-bottom 8px
    margin-left 3px

  .separator
    margin 0 5px

  .game-submitter
    font-weight bold
    margin 0 5px

  .game-card-name
    font-weight bold

  .commands
    text-align right

</style>
