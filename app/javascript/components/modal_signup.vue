<template lang="pug">
  #modal-background(@click.self="closeModal")
    .modal-content
      h1 Sign up
      form(@submit="submitCredentials")
        input(
          type="text"
          ref="username"
          placeholder="Username"
          @keyup="hideError"
        )
        input(
          type="password"
          ref="password"
          placeholder="Password"
          @keyup="hideError"
        )
        input(
          type="password"
          ref="password_confirmation"
          placeholder="Confirm password"
          @keyup="hideError"
        )
        .sign-up-section
          input(type="submit" value="Sign up")
          .error(v-if="showError") {{ errorMessage }}

</template>

<script>
  import Mousetrap from 'mousetrap'
  import { createUser, getMyUserInfo } from '../api/requests'

  export default {
    data() {
      return {
        showError: false,
        errorMessage: ""
      }
    },

    created() {
      document.body.style.overflow = 'hidden'
      Mousetrap.bind('esc', () => this.$store.dispatch('closeModal'))
    },

    destroyed() {
      setTimeout(() => document.body.style.overflow = 'auto', 200)
      Mousetrap.reset()
    },

    methods: {
      closeModal() {
        this.$store.dispatch('closeModal')
      },
      setError(message) {
        this.errorMessage = message
        this.showError = true
      },
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
        if (!credentials.user.password || !credentials.user.password_confirmation) {
          this.setError("Passwords can't be blank")
          return
        } else if (credentials.user.password !== credentials.user.password_confirmation) {
          this.setError("Passwords don't match")
          return
        }
        createUser(credentials).then(() => {
          getMyUserInfo()
          this.$store.dispatch('closeModal')
        }).catch(error => this.setError(error.response.data.error))
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  #modal-background
    width 100%
    height 100%
    position fixed
    z-index 10
    left 0
    top 0
    background rgba(0,0,0,0.5)

  .modal-content
    width 600px
    height 360px
    background white
    position absolute
    padding 40px 50px
    left 50%
    top 50%
    margin-left -300px
    margin-top -180px
    box-shadow 0 0 10px 5px rgba(0,0,0,0.1)
    border-top 5px solid black
    border-radius 2px

    h1
      display block
      font-size 20px
      margin-bottom 30px

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
        background highlight-color
        border none
        border-radius 2px
        font-size 18px
        padding 7px 24px

        &:hover
          opacity 0.9
          cursor pointer

    .sign-up-section
      display flex
      align-items center

    .error
      color orange
      margin-left 20px

</style>
