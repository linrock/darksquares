<template lang="pug">
  #main-header
    header
      .main
        .square

        .left
          router-link(to="/") Dark Squares

        .right
          router-link(to="/importer") Import game
          router-link(to="/games") Games
          router-link(to="/annotations") Annotations

        .far-right
          router-link(:to="userPath") {{ userLinkText }}

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
        return this.username ? "/profile" : "/login"
      },
      userLinkText: function() {
        return this.username ? this.username : "Log in"
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
    width 1200px
    display flex

    a
      color inherit
      text-decoration none

    .square
      width 40px
      height 40px
      background #222

    .left
      width 415px
      margin-left 40px

    .right
      font-size 14px

      a
        color rgba(255,255,255,0.6)
        margin-right 30px

      .router-link-exact-active
        color white

    .far-right
      font-size 14px
      margin-left auto

  .header-spacer
    height 40px

</style>
