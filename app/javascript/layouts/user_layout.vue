<template lang="pug">
  main#profile
    .left-content
      mini-board-detailed(:showPgn="true" :showHeaderInfo="false")
    .right-content
      header
        h1 {{ user.username }}
      nav
        router-link(:to="overviewLink") Overview
        router-link(:to="gamesLink") {{ user.games.length }} Games
        router-link(:to="annotationsLink") {{ user.annotations.length }} Annotations
      .content
        router-view(:user="user")

</template>

<script>
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import User from '../models/user'
  import { getUserProfile } from '../api/requests'
  import router from '../router'

  export default {
    props: {
      username: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        user: new User()
      }
    },

    created() {
      getUserProfile(this.username).then(response => {
        this.user = new User(response.data.user)
      })
    },

    computed: {
      overviewLink() {
        return `/u/${this.user.username}`
      },
      gamesLink() {
        return `${this.overviewLink}/games`
      },
      annotationsLink() {
        return `${this.overviewLink}/annotations`
      }
    },

    components: {
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
    padding-left 420px

    header
      background #4e4e4e
      height 70px
      padding-left 30px

      h1
        color white
        font-size 20px
        padding 30px 0 20px
        margin 0

    nav
      background #E3E3E3
      padding-left 30px
      height 45px
      line-height 49px
      display flex
      font-weight bold

      a
        color #1A1A1A
        display block
        opacity 0.5
        font-size 14px
        text-decoration none
        text-transform uppercase
        margin-right 40px

        &:hover
          text-decoration underline

      .router-link-exact-active
        opacity 1

    .content
      background #F1F1F1
      padding-left 30px
      min-height 1000px
      height 100%

</style>