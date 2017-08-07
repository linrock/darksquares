<template>
  <div class="game-card-header" v-if="game.meta">
    <span class="game-card-name">{{ game.meta.name }}</span>
    <span class="game-card-submitter" v-if="game.meta.submitter">
      &nbsp;&ndash;&nbsp; submitted by {{ game.meta.submitter }}
    </span>
  </div>
</template>

<script>
  import Game from '../models/game'

  export default {
    props: {
      game: Game,
    }
  }
</script>

<style lang="stylus">
  .game-card-header
    color rgba(0,0,0,0.4)
    font-size 13px
    margin-bottom 8px
    margin-left 3px

  .game-card-name
    font-weight bold

</style>
