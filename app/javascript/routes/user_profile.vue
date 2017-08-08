<template lang="pug">
  main#profile
    .content
      h1 My profile

      a(@click="signOut") sign out

</template>

<script>
  import {
    getAccessToken,
    setAccessToken,
    setUsername
  } from '../store/local_storage'
  import router from '../router'

  export default {
    beforeRouteEnter: function(to, from, next) {
      if (getAccessToken()) {
        next()
      } else {
        next({ path: "/login" })
      }
    },
    methods: {
      signOut() {
        setAccessToken(null)
        setUsername(null)
        router.push({ path: '/' })
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
