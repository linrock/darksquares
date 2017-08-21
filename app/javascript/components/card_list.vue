<template lang="pug">
  .card-list
    .card-wrapper(v-for="item in cardList")
      .votes
        img.upvote(src="/assets/upvote.svg")
        .score 7
        img.downvote(src="/assets/downvote.svg")

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
    width 700px

    .card-wrapper
      display flex
      margin 25px 0

      .votes
        display flex
        align-items center
        flex-direction column
        padding 2px 0 0 3px
        width 60px

        img, div
          display block

        img
          width 10px

        .score
          color rgba(0,0,0,0.4)
          font-size 12px
          font-weight bold
          margin 9px 0

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
