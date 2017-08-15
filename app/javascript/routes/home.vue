<template lang="pug">
  main#home
    .left-content
      mini-board-detailed(:showPgn="true" :showHeaderInfo="false")

      .container
        header
          h1 Recent games
          .instructions
            | Hover over the graphs to explore game positions.
            | Click to view the position in depth.

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

  main#home
    background #eee
    width 100%
    height 100%
    min-height 1000px

  .left-content
    background white
    width 420px
    height 100%
    min-height 1000px

  .mini-board-view
    position fixed
    top 70px
    left 40px
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

  .container
    width 642px // TODO
    margin-left 450px
    border-left 1px solid #eee

    header
      padding-left 25px
      border-bottom 1px solid #eee
      width 640px
      background white

  h1
    color #292929
    font-size 20px
    padding 60px 0 10px
    margin 0

  .description
    font-size 14px
    line-height 20px
    width 640px

    .contender
      margin 30px 0

  .instructions
    font-size 12px
    margin 10px 0 20px
    font-weight bold
    color rgba(0,0,0,0.3)

</style>
