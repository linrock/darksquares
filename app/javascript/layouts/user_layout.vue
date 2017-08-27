<template lang="pug">
  main#profile
    .left-content
      mini-board-detailed(:showPgn="true")
    .right-content
      header
        template(v-if="headerText")
          h1 {{ headerText }}
          h2 Member since {{ user.memberSince }}
      nav
        template(v-if="user.username")
          router-link(:to="overviewLink") Overview
          router-link(:to="gamesLink") {{ user.gamesCount }} Games
          router-link(:to="annotationsLink") {{ user.annotationsCount }} Annotations
      .content
        router-view(:isLoading="isLoading" :user="user")

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
        isLoading: true,
        headerText: null,
        user: new User()
      }
    },

    created() {
      getUserProfile(this.username).then(response => {
        this.user = new User(response.data.user)
        this.headerText = this.user.username
        this.isLoading = false
      }).catch(error => {
        const statusCode = error.response.status
        this.headerText = statusCode === 404 && "User not found" || `Error ${statusCode}`
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
  @import "../common.styl"

  main
    width 100%
    height 100%
    min-height 1000px

  .left-content
    background white
    width 420px
    height "calc(100% - %s)" % main-header-height
    position fixed
    top main-header-height
    padding-bottom 20px
    overflow-y scroll

    .mini-board-view
      margin 30px 0 0 40px
      width 338px

  .right-content
    width 100%
    height 100%
    padding-left 420px

    header
      background #393939
      padding 29px 0 19px 60px
      height 100px

      h1
        color white
        font-size 20px
        margin 0

      h2
        color #cacaca
        font-size 12px
        margin 10px 0

    nav
      background #E3E3E3
      padding-left 30px + 30px
      height 41px
      line-height 44px
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
