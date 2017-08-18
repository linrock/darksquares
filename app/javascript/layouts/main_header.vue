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
          router-link(to="/about")
            img(src="/assets/about.svg" class="about")
            | About
        .far-right
          router-link(:to="userPath")
            img(src="/assets/user.svg")
            | {{ userLinkText }}
    .header-spacer

</template>

<script>
  import { getUsername } from '../store/local_storage'

  export default {
    data: function() {
      return {
        username: getUsername()
      }
    },
    computed: {
      userPath: function() {
        return this.username ? `/u/${this.username}` : `/login`
      },
      userLinkText: function() {
        return this.username ? this.username : `Log in`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  header
    background #333
    color white
    width 100%
    height 40px
    line-height 40px
    position fixed
    z-index 1

  .main
    font-size 14px
    width 1090px
    height 100%
    display flex

    a
      color inherit
      text-decoration none

    .square
      width 40px
      height 40px
      background #222

    .left
      width 149px
      margin-left 40px

    .right
      display flex

      a
        color rgba(255,255,255,0.6)
        display flex
        margin-right 30px
        height 100%

        img
          width 18px
          position relative
          margin-right 6px
          opacity 0.4

        .import
          position relative
          top 2px

        .submit
          position relative
          top 1px
          width 17px

        .about
          position relative
          top 1px
          width 16px

      .router-link-exact-active
        color white

        img
          opacity 0.8

    .far-right
      margin-left auto

      img
        width 18px
        position relative
        top 4px
        margin-right 5px
        background #222

  .header-spacer
    height 40px

</style>
