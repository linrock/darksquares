<template lang="pug">
  main#games
    .background
      .left-content
        mini-board-detailed(:showPgn="true" :showHeaderInfo="false")

        .container
          header.shadowed
            h1 My games

          card-list(gameSource="myGames")

</template>

<script>
  import requireLogin from './guards/require_login'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import CardList from '../components/card_list.vue'
  import Game from '../models/game'
  import { loadMyGames } from '../store/games'

  export default {
    beforeRouteEnter: requireLogin,

    created: () => loadMyGames(),

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

  .shadowed
    box-shadow 0 0 5px rgba(0,0,0,0.15)

  .background
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
    left 35px
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
    width 800px
    margin-left 450px
    border-left 1px solid #eee

    header
      background white
      padding-left 25px
      border-bottom 1px solid #eee
      width 640px

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
