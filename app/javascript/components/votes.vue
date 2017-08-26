<template lang="pug">
  .votes
    a(@click="upvoteItem" :class="[{ voted: voteState === Vote.Upvoted }]")
      svg.upvote(width="12px" height="10px" viewBox="0 0 12 10")
        g
          polygon(points="6 0 12 10 0 10")
    .score(:class="[{ voted: voteState !== Vote.None }]") {{ score }}
    a(@click="downvoteItem" :class="[{ voted: voteState === Vote.Downvoted }]")
      svg.downvote(width="12px" height="10px" viewBox="0 0 12 10")
        g
          polygon(points="6 10 12 0 0 0")

</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'

  const Vote = {
    None: 'none',
    Upvoted: 'upvoted',
    Downvoted: 'downvoted'
  }

  export default {
    props: ['item'],

    data() {
      return {
        Vote,
        initialScore: ~~(Math.random() * 20),
        voteState: Vote.None,
      }
    },

    computed: {
      score() {
        let score = this.initialScore
        if (this.voteState === Vote.Upvoted) {
          score = score + 1
        } else if (this.voteState === Vote.Downvoted) {
          score = score - 1
        }
        return score
      }
    },

    methods: {
      upvoteItem() {
        this.voteState = this.voteState === Vote.Upvoted ? Vote.None : Vote.Upvoted
      },
      downvoteItem() {
        this.voteState = this.voteState === Vote.Downvoted ? Vote.None : Vote.Downvoted
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .votes
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
      opacity 0.6

  svg
    width 10px
    g
      stroke none
      fill #dadada

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
