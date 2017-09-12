<template lang="pug">
  .application
    main-header
    router-view
    transition(name="fade")
      modal-signup(v-if="modalState.open")

</template>

<script>
  import MainHeader from './main_header'
  import ModalSignup from '../components/modal_signup'
  import { getAccessToken, getUsername } from '../store/local_storage'
  import { modalState } from '../store/modal_state'

  export default {
    data() {
      return {
        modalState
      }
    },

    created() {
      const username = getAccessToken() && getUsername()
      this.$store.dispatch('setCurrentUser', { username })
    },

    components: {
      MainHeader,
      ModalSignup
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"
</style>
