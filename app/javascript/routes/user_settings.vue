<template lang="pug">
  main#user_settings
    .content
      h1 User settings
      div
        a(@click="signOut") sign out
    page-title(title="Settings")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import requireLogin from './guards/require_login'
  import router from '../router'

  export default {
    beforeRouteEnter: requireLogin,

    methods: {
      signOut() {
        setAccessToken(null)
        setUsername(null)
        router.push({ path: '/' })
      }
    },

    components: {
      PageTitle
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
