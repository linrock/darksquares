<template lang="pug">
  main#home
    .left-content
      .left-inner
        mini-board-detailed(:showPgn="true")
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
    position fixed
    top 0
    padding 40px 0 20px
    overflow-y scroll

    .left-inner
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
    padding-left 420px
    background #f4f4f4

    header
      background #393939
      padding 29px 0 19px 60px
      height 100px

      h1
        color white
        font-size 20px
        margin 0

      .instructions
        color #cacaca
        font-size 12px
        margin 10px 0

    .content
      min-height 1000px
      height 100%

</style>
