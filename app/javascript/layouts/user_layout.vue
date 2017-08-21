<template lang="pug">
  main#profile
    .left-content
      mini-board-detailed(:showPgn="true")
    .right-content
      header
        h1(v-if="headerText") {{ headerText }}
      nav
        template(v-if="user.username")
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
        headerText: null,
        user: new User()
      }
    },

    created() {
      getUserProfile(this.username).then(response => {
        this.user = new User(response.data.user)
        this.headerText = this.user.username
      }).catch(error => {
        const statusCode = error.response.status
        this.headerText = statusCode === 404 && "User not found" || `Error statusCode`
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
      background #393939
      height 70px
      padding-left 30px + 30px

      h1
        color white
        font-size 20px
        padding 30px 0 20px
        margin 0

    nav
      background #E3E3E3
      padding-left 30px + 30px
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
      min-height 1000px
      height 100%

</style>
