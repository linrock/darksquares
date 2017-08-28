<template lang="pug">
  #main-header
    header
      .main
        .square
        .left
          router-link(to="/") Dark Squares
        .right
          router-link(to="/import")
            img(src="/assets/import.svg" class="import")
            | Import game
          router-link(to="/submit")
            img(src="/assets/submit.svg" class="submit")
            | Submit game
          // router-link(to="/about")
            img(src="/assets/about.svg" class="about")
            | About
        .far-right
          router-link(:to="userPath")
            img(src="/assets/user.svg")
            | {{ userLinkText }}
    .header-spacer

</template>

<script>
  import { userState } from '../store/user_state'

  export default {
    data() {
      return {
        userState
      }
    },

    computed: {
      username() {
        return this.userState.username
      },
      userPath() {
        return this.username ? `/u/${this.username}` : `/sign_up`
      },
      userLinkText() {
        return this.username ? this.username : `Sign up`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  header
    background #212121
    color white
    width 100%
    height main-header-height
    line-height main-header-height
    position fixed
    z-index 1

  .main
    font-size 14px
    width 1120px
    height 100%
    display flex

    a
      color inherit
      display flex
      height 100%
      opacity 0.85
      text-decoration none

      &:hover
        opacity 1

    .square
      width 40px
      height 40px
      background #111

    .left
      width 149px
      margin-left 40px

    .right
      display flex

      a
        color rgba(255,255,255,0.8)
        display flex
        margin-right 30px

        img
          width 18px
          position relative
          margin-right 6px
          opacity 0.4

        .import
          top 2px

        .submit
          top 1px
          width 17px

        .about
          top 2px
          width 14px

    a.router-link-exact-active
      color white
      opacity 1

      img
        opacity 0.8

    .far-right
      margin-left auto

      img
        opacity 0.4
        width 18px
        margin-right 5px

  .header-spacer
    height main-header-height

</style>
