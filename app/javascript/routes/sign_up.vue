<template>
  <div id="sign_up">
    <form @submit="submitCredentials">
      <input type="text" placeholder="Username" ref="username"/>
      <input type="password" placeholder="Password" ref="password"/>
      <input type="password" placeholder="Confirm password" ref="password_confirmation"/>
      <input type="submit" value="Sign up"/>
    </form>
  </div>
</template>

<script>
  import { createUser, getUserInfo } from '../api_client'
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
          user: {
            username: this.$refs.username.value,
            password: this.$refs.password.value,
            password_confirmation: this.$refs.password_confirmation.value
          }
        }
        createUser(credentials).then(() => {
          getUserInfo()
          window.location = "/"
        })
      }
    },
  }
</script>

<style>

</style>
