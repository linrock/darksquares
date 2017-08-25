<template lang="pug">
  section.card-list
    loading(v-if="!cardList.length")
    transition(name="fade")
      .cards(v-if="cardList.length")
        .card-wrapper(v-for="item in cardList")
          votes(:item="item")

          .annotation-card-container(v-if="item.text")
            annotation-card(:annotation="item")

          .game-card-container(v-if="item.pgn")
            // .commands(v-if="gameSource")
              span.delete(@click="deleteGame(card)") ×
            game-card-header(:game="item")
            .game-container
              game-card(:game="item")

</template>

<script>
  import AnnotationCard from './annotation_card.vue'
  import GameCardHeader from './game_card_header.vue'
  import GameCard from './game_card.vue'
  import Votes from './votes.vue'
  import Loading from './loading.vue'
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
          return this.sourceGameIds.
            map(id => gamesMap[id]).
            filter(game => game.graphPoints && game.graphPoints.length > 0)
        } else if (this.games && this.annotations) {
          return this.games.concat(this.annotations).sort((a,b) => {
            let bDate = b.submittedAt ? b.submittedAt : b.createdAt
            let aDate = a.submittedAt ? a.submittedAt : a.createdAt
            return bDate - aDate
          })
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
      Loading,
      Votes,
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .card-list
    padding-top 10px
    width 700px

    .card-wrapper
      display flex
      margin 30px 0

      .votes
        width 60px

  .game-card-container .commands
    float right
    opacity 0.3

    a
      text-decoration none

    .delete
      opacity 0.3
      transition opacity 0.15s ease

      &:hover
        opacity 0.5
        cursor pointer

  .game-container
    border-radius 1px
    width 640px
    border-bottom 1px solid #eee
    background white

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
