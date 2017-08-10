<template lang="pug">
  .game-list
    .game-submission(v-for="game in games")
      game-card-header(:game="game")
      .game-container.shadowed
        game-card(:game="game")

</template>

<script>
  import GameCardHeader from '../components/game_card_header.vue'
  import GameCard from '../components/game_card.vue'

  export default {
    props: {
      games: Array
    },
    
    components: {
      GameCard,
      GameCardHeader,
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

  .game-submission
    margin 25px 0

    a
      text-decoration none

  .game-container
    @include clearfix
    border-radius 1px
    width 640px
    border-bottom 1px solid #eee
    background white

    .move-list
      margin 15px 30px 0 0

  .graph-container
    .game-info
      opacity 0.8
      transition opacity 0.25s ease

  .annotation-preview
    font-size 12px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    margin 5px 0
    color #005F2F
    opacity 0.9

  .game-summary
    float left
    width 300px
    margin-left 40px
    margin-top 60px

  .position-annotations
    margin-top 26px
    font-size 15px
    line-height 20px

</style>
