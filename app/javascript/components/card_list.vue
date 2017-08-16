<template lang="pug">
  .card-list
    .card(v-for="card in cardList")

      .annotation-card-container(v-if="card.text")
        annotation-card(:annotation="card")

      .game-card-container(v-if="card.pgn")
        .commands(v-if="gameSource")
          span.delete(@click="deleteGame(card)") ×
        game-card-header(:game="card")
        .game-container
          game-card(:game="card")

</template>

<script>
  import AnnotationCard from '../components/annotation_card.vue'
  import GameCardHeader from '../components/game_card_header.vue'
  import GameCard from '../components/game_card.vue'
  import { gameIdLists, gamesMap } from '../store/games'
  import { deleteGame } from '../api/requests'

  export default {
    props: {
      games: {
        type: Array,
      },
      annotations: {
        type: Array,
      },
      gameSource: {
        type: String,
      }
    },

    data() {
      return {
        gameIdLists
      }
    },

    methods: {
      deleteGame(game) {
        console.log('deleting game')
        // deleteGame(game)
        this.sourceGameIds.splice(this.sourceGameIds.findIndex(id => id === game.id), 1)
      }
    },

    computed: {
      sourceGameIds() {
        return this.gameIdLists[this.gameSource]
      },
      cardList() {
        if (this.gameSource) {
          return this.sourceGameIds.map(id => gamesMap[id])
        } else if (this.games && this.annotations) {
          return this.games.concat(this.annotations).sort((a,b) => a.createdAt < b.createdAt)
        } else if (this.annotations) {
          return this.annotations
        } else if (this.games) {
          return this.games
        }
      }
    },

    components: {
      AnnotationCard,
      GameCardHeader,
      GameCard,
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

  .card-list
    padding-top 10px
    width 640px

  .annotation-card-container
    margin 25px 0

  .game-card-container
    margin 25px 0

    .commands
      float right
      opacity 0.3

      .delete
        opacity 0.3
        transition opacity 0.15s ease

        &:hover
          opacity 0.5
          cursor pointer

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
