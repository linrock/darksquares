<template>
  <form @submit="submitCredentials">
    <input type="text" ref="username"/>
    <input type="password" ref="password"/>
    <input type="submit" value="Log in"/>
  </form>
</template>

<script>
  import { createSession } from '../api_client'

  export default {
    methods: {
      submitCredentials: function(e) {
        e.preventDefault()
        const credentials = {
          username: this.$refs.username.value,
          password: this.$refs.password.value
        }
        createSession(credentials).then(() => {
          window.location = "/"
        })
      }
    }
  }
</script>

<style>

</style>
