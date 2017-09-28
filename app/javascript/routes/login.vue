<template lang="pug">
  main#login
    h1 Log in
    form(@submit="submitCredentials")
      input(type="text" ref="username" placeholder="Username"
            @keyup="hideError")
      input(type="password" ref="password" placeholder="Password"
            @keyup="hideError")
      div
        input(type="submit" value="Log in")
        .error(v-if="showError") Invalid username or password
    .bottom-instructions
      | Don't have an account? &mdash;
      router-link(to="/sign_up") Sign up
    page-title(title="Log in")

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
      }
    },

    methods: {
      hideError() {
        this.showError = false
      },
      submitCredentials(e) {
        e.preventDefault()
        const credentials = {
          grant_type: 'password',
          username: this.$refs.username.value.trim(),
          password: this.$refs.password.value.trim()
        }
        if (!credentials.username || !credentials.password) {
          return
        }
        this.$store.dispatch('logIn', credentials).then(() => {
          router.push({ path: '/' })
        }).catch(() => {
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

  main#login
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
