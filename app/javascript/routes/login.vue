<template>
  <main id="login">
    <form @submit="submitCredentials">
      <input type="text" ref="username" placeholder="Username"/>
      <input type="password" ref="password" placeholder="Password"/>
      <input type="submit" value="Log in"/>
    </form>
  </main>
</template>

<script>
  import requireAnonymous from './guards/require_anonymous'
  import { createSession, getUserInfo } from '../api/requests'

  export default {
    beforeRouteEnter: requireAnonymous,

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
