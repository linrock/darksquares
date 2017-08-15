<template lang="pug">
  main#home
    .left-content
      mini-board-detailed(:showPgn="true" :showHeaderInfo="false")
    .right-content
      header
        h1 Recent games
        .instructions
          | Hover over the graphs to explore chess games.
          | Click to annotate a position.
      .content
        card-list(gameSource="home")

</template>

<script>
  import Chess from 'chess.js'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import CardList from '../components/card_list.vue'
  import Game from '../models/game'
  import { loadHomeGames } from '../store/games'

  window.Chess = Chess

  export default {
    created: () => loadHomeGames(),

    components: {
      CardList,
      MiniBoardDetailed,
    }
  }
</script>

<style lang="stylus" scoped>
  clearfix()
    &:before, &:after
      display table
      content ""

    &:after
      clear both

  main
    width 100%
    height 100%
    min-height 1000px

  .left-content
    background white
    width 420px
    height 100%
    min-height 1000px
    position fixed

    .mini-board-view
      margin-top 30px
      margin-left 40px
      width 338px

      .game-info
        margin-bottom 17px

      .position-info
        margin-top 10px
        clearfix()

        .game-position
          float left

        .position-evaluation
          float right

  .right-content
    width 100%
    height 100%

    header
      background #4e4e4e
      padding 30px 0 20px 450px

      h1
        color white
        font-size 20px
        margin 0

      .instructions
        color #cacaca
        font-size 12px
        margin 10px 0

    .content
      background #F1F1F1
      padding-left 30px + 420px
      min-height 1000px
      height 100%

</style>
