<template lang="pug">
  .game-card-header(v-if="metadata")
    span(v-if="metadata.name")
      span.game-card-name {{ metadata.name }}
      .separator &ndash;
    span(v-if="metadata.submitter")
      | submitted by
      span.game-submitter
        router-link(:to="userPath") {{ metadata.submitter }}
      span.time-ago {{ metadata.timeAgo() }}

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

    computed: {
      metadata: function() {
        return this.game.metadata
      },
      userPath: function() {
        return `/u/${this.metadata.submitter}`
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

    a
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

  .game-card-name
    font-weight bold

</style>
