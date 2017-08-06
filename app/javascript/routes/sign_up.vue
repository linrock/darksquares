<template>
  <form @submit="submitCredentials">
    <input type="text" ref="username"/>
    <input type="password" ref="password"/>
    <input type="password" ref="password_confirmation"/>
    <input type="submit" value="Sign up"/>
  </form>
</template>

<script>
  import { createUser } from '../api_client'
  import store from 'store'

  export default {
    beforeCreate: function() {
      if (store.get('access_token')) {
         window.location = "/"
      }
    },
    methods: {
      submitCredentials: function(e) {
        e.preventDefault()
        const credentials = {
          username: this.$refs.username.value,
          password: this.$refs.password.value,
          password_confirmation: this.$refs.password_confirmation.value
        }
        createUser(credentials).then(() => {
          window.location = "/"
        })
      }
    }
  }
</script>

<style>

</style>
