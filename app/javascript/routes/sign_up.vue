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
        .error(v-if="showError") {{ errorMessage }}
    .bottom-instructions
      | Have an account? &mdash;
      router-link(to="/login") Log in
    page-title(title="Sign up")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import router from '../router'
  import requireAnonymous from './guards/require_anonymous'

  export default {
    beforeRouteEnter: requireAnonymous,

    data() {
      return {
        showError: false,
        errorMessage: ""
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
        this.$store.dispatch('signUp', credentials).then(() => {
          router.push({ path: '/' })
        }).catch((error) => {
          this.errorMessage = error.response.data.error
          this.showError = true
        })
      }
    },

    components: {
      PageTitle
    }
  }
</script>

<style lang="stylus" scoped>
  @require "../common.styl"

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
      background highlight-color
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

  .bottom-instructions
    margin-top 70px

    a
      color inherit
      margin 0 5px

</style>
