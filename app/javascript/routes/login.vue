<template>
  <div id="login">
    <main-header/>
    <form @submit="submitCredentials">
      <input type="text" ref="username" placeholder="Username"/>
      <input type="password" ref="password" placeholder="Password"/>
      <input type="submit" value="Log in"/>
    </form>
  </div>
</template>

<script>
  import MainHeader from '../components/main_header.vue'
  import { createSession } from '../api_client'
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
          password: this.$refs.password.value
        }
        createSession(credentials).then(() => {
          window.location = "/"
        })
      }
    },
    components: {
      MainHeader
    }
  }
</script>

<style>

</style>
