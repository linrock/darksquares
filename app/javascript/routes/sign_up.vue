<template>
  <main id="sign_up">
    <form @submit="submitCredentials">
      <input type="text" placeholder="Username" ref="username"/>
      <input type="password" placeholder="Password" ref="password"/>
      <input type="password" placeholder="Confirm password" ref="password_confirmation"/>
      <input type="submit" value="Sign up"/>
    </form>
  </main>
</template>

<script>
  import requireAnonymous from './guards/require_anonymous'
  import { createUser, getUserInfo } from '../api/requests'

  export default {
    beforeRouteEnter: requireAnonymous,

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
