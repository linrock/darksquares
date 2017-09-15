<template lang="pug">
  main#profile
    .left-content
      mini-board-detailed(:showPgn="true")
    .right-content
      header
        template(v-if="headerText")
          h1 {{ headerText }}
          h2(v-if="!errorMessage") Member since {{ user.memberSince }}
      nav
        template(v-if="user && user.username")
          router-link(:to="userLink") Overview
          router-link(:to="gamesLink") {{ user.gamesCount }} Games
          router-link(:to="annotationsLink") {{ user.annotationsCount }} Annotations
      .content
        .loading-indicator(v-if="isLoading")
          loading
        router-view(v-if="!isLoading" :user="user")

</template>

<script>
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import Loading from '../components/loading.vue'

  export default {
    props: {
      username: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        currentUsername: this.username,
        errorMessage: null,
      }
    },

    created() {
      this.loadUserProfile(this.currentUsername)
    },

    beforeRouteUpdate(to, from, next) {
      // TODO figure out how to get layout component updating when
      // navigating to a different user profile
      if (to.params.username !== this.currentUsername) {
        this.currentUsername = to.params.username
        this.loadUserProfile(to.params.username)
      }
      next()
    },

    methods: {
      loadUserProfile(username) {
        if (this.user && this.user.username === username) {
          return
        }
        this.$store.dispatch('fetchUserProfile', username).catch(error => {
          const statusCode = error.response.status
          this.errorMessage = statusCode === 404 && "User not found" || `Error ${statusCode}`
        })
      }
    },

    computed: {
      user() {
        return this.$store.getters.getUser(this.username)
      },
      userLink() {
        return `/u/${this.user.username}`
      },
      gamesLink() {
        return `${this.userLink}/games`
      },
      annotationsLink() {
        return `${this.userLink}/annotations`
      },
      isLoading() {
        return !this.user
      },
      headerText() {
        return this.errorMessage ? this.errorMessage : this.user ? this.user.username : ''
      },
    },

    components: {
      MiniBoardDetailed,
      Loading,
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
    overflow-y auto

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
      background #eaeaea
      padding-left 30px + 30px
      height 41px
      line-height 44px
      display flex
      font-weight bold

      a
        color #1a1a1a
        display block
        opacity 0.5
        font-size 14px
        letter-spacing 0.2px
        text-decoration none
        text-transform uppercase
        margin-right 40px

        &:hover
          text-decoration underline

      .router-link-exact-active
        opacity 1

    .content
      background card-list-bg-color
      min-height 1000px
      height 100%

      .loading-indicator
        padding-top 60px
        margin-left 60px

</style>
