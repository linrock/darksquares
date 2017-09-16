<template lang="pug">
  .votes(:class="[{ disabled }]")
    a(@click="upvoteItem" :class="[{ voted: voteState === Vote.Upvoted }]")
      svg.upvote(width="12px" height="10px" viewBox="0 0 12 10")
        g
          polygon(points="6 0 12 10 0 10")
    .score(:class="[{ voted: voteState !== Vote.None }]") {{ score }}
    template(v-if="allowDownvotes")
      a(@click="downvoteItem" :class="[{ voted: voteState === Vote.Downvoted }]")
        svg.downvote(width="12px" height="10px" viewBox="0 0 12 10")
          g
            polygon(points="6 10 12 0 0 0")

</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'
  import { createGameVote, createAnnotationVote } from '../api/requests'

  const Vote = {
    None: 'none',
    Upvoted: 'upvoted',
    Downvoted: 'downvoted'
  }

  export default {
    props: {
      item: {
        type: [Game, Annotation],
        required: true
      }
    },

    data() {
      return {
        Vote,
        initialScore: this.item.score - this.$store.getters.getGameVote(this.item.id),
        allowDownvotes: false,
      }
    },

    computed: {
      username() {
        return this.$store.getters.username
      },
      voteValue() {
        return this.$store.getters.getGameVote(this.item.id)
      },
      voteState() {
        let voteState = Vote.None
        if (this.voteValue === 1) {
          voteState = Vote.Upvoted
        } else if (this.voteValue === -1) {
          voteState = Vote.Downvoted
        }
        return voteState
      },
      disabled() {
        return this.item.username === this.username
      },
      score() {
        return this.initialScore + this.voteValue
      }
    },

    methods: {
      upvoteItem() {
        this.attemptVote(Vote.Upvoted, 1)
      },
      downvoteItem() {
        this.attemptVote(Vote.Downvoted, -1)
      },
      attemptVote(voteType, value) {
        if (this.disabled) {
          return
        }
        if (!this.username) {
          this.$store.dispatch('openModal')
          return
        }
        this.createVote(this.voteValue === value ? 0 : value)
      },
      createVote(value) {
        const data = {
          vote: {
            value
          }
        }
        if (this.item.pgn) {
          this.$store.dispatch('setGameVote', { gameId: this.item.id, value })
          createGameVote(this.item.id, data)
        } else {
          createAnnotationVote(this.item.id, data)
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .votes
    position absolute
    display flex
    align-items center
    flex-direction column
    padding 2px 0 0 3px

    a, svg, div
      display block

    a:hover
      cursor pointer

    a:hover svg g
      fill #aaa

    a.voted svg g
      fill highlight-color
      opacity 0.8

    &.disabled
      a:hover
        cursor auto

        svg g
          fill #ececec

      svg g
        fill #ececec

  svg
    width 10px
    g
      stroke none
      fill #d5d5d5

  .score
    color rgba(0,0,0,0.4)
    font-size 12px
    font-weight bold
    margin 9px 0
    user-select none

    &.voted
      color highlight-color
      opacity 0.6

</style>
