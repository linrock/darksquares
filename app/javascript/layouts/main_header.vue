<template lang="pug">
  #main-header
    header
      .main
        .square
        .left
          router-link(to="/") Dark Squares
        .right
          router-link(to="/import")
            | Import game
          router-link(to="/submit")
            | Submit game
          router-link(to="/about")
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
      a
        color rgba(255,255,255,0.6)
        margin-right 30px

      .router-link-exact-active
        color white

    .far-right
      margin-left auto

      img
        width 18px
        position relative
        top 4px
        margin-right 5px

  .header-spacer
    height 40px

</style>
