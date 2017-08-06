<template>
  <div id="login">
    <form @submit="submitCredentials">
      <input type="text" ref="username" placeholder="Username"/>
      <input type="password" ref="password" placeholder="Password"/>
      <input type="submit" value="Log in"/>
    </form>
  </div>
</template>

<script>
  import { createSession, getUserInfo } from '../api/requests'
  import { getAccessToken } from '../store/local_storage'

  export default {
    beforeRouteEnter: function(to, from, next) {
      if (getAccessToken()) {
        next({ path: "/" })
      } else {
        next()
      }
    },
    methods: {
      submitCredentials: function(e) {
        e.preventDefault()
        const credentials = {
          username: this.$refs.username.value,
          password: this.$refs.password.value
        }
        createSession(credentials).then(() => {
          getUserInfo()
          window.location = "/"
        })
      }
    },
  }
</script>

<style>

</style>
