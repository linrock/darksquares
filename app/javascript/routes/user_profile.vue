<template>
  <main id="profile">
    My profile

    <a @click="signOut">sign out</a>
  </main>
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
