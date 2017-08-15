<template lang="pug">
  main#sign_up
    h1 Sign up
    form(@submit="submitCredentials")
      input(type="text" ref="username" placeholder="Username"
            @keyup="hideError")
      input(type="password" ref="password" placeholder="Password"
            @keyup="hideError")
      input(type="password" ref="password_confirmation" placeholder="Confirm password"
            @keyup="hideError")
      div
        input(type="submit" value="Sign up")
        .error(v-if="showError") Invalid username or password

</template>

<script>
  import router from '../router'
  import requireAnonymous from './guards/require_anonymous'
  import { createUser, getUserInfo } from '../api/requests'

  export default {
    beforeRouteEnter: requireAnonymous,

    data() {
      return {
        showError: false,
      }
    },

    methods: {
      hideError() {
        this.showError = false
      },
      submitCredentials(e) {
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
          router.push({ path: '/' })
        }).catch(() => {
          this.showError = true
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  main#sign_up
    margin 100px auto
    width 600px

  h1
    font-size 20px
    margin-bottom 30px

  div
    display flex
    align-items center

  input
    display block
    font-size 18px

    &[type="text"], &[type="password"]
      border-radius 2px
      border 1px solid #e0e0e0
      padding 7px 14px
      margin 15px 0
      width 320px

    &[type="submit"]
      color white
      background rgb(58, 137, 201)
      border none
      border-radius 2px
      font-size 18px
      padding 7px 24px

      &:hover
        opacity 0.9
        cursor pointer

  .error
    color orange
    margin-left 20px

</style>
