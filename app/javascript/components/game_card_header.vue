<template lang="pug">
  .game-card-header
    span(v-if="game.name")
      span.game-card-name {{ game.name }}
      span.separator &ndash;
    span {{ prefixText }}
    span.game-author
      router-link(:to="userPath") {{ game.user.username }}
    span.time-ago {{ timeAgo }}

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
      metadata() {
        return this.game.metadata
      },
      prefixText() {
        return this.game.submittedAt ? `submitted by` : `created by`
      },
      timeAgo() {
        return this.game.submittedAt ? this.game.submittedAtTimeAgo :
                                       this.game.createdAtTimeAgo
      },
      userPath() {
        return `/u/${this.game.user.username}`
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

  .game-author
    font-weight bold
    margin 0 5px

    a
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

  .game-card-name
    color #333
    font-weight bold

</style>
