<template lang="pug">
  main#annotations
    .content
      h1 My annotations

</template>

<script>
  import {
    getAccessToken,
  } from '../store/local_storage'
  import router from '../router'

  export default {
    beforeRouteEnter: function(to, from, next) {
      if (getAccessToken()) {
        next()
      } else {
        next({ path: "/login" })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    display flex
    width 1200px
    margin-left 80px
    padding-top 30px

</style>
