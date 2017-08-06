<template>
  <div id="sign_up">
    <form @submit="submitCredentials">
      <input type="text" ref="username" placeholder="Username"/>
      <input type="password" ref="password" placeholder="Password"/>
      <input type="password" ref="password_confirmation" placeholder="Confirm password"/>
      <input type="submit" value="Sign up"/>
    </form>
  </div>
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
    },
  }
</script>

<style>

</style>
