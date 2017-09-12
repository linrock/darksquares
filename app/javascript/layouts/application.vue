<template lang="pug">
  .application
    main-header
    router-view
    transition(name="fade")
      modal-signup(v-if="$store.state.modal.isOpen")

</template>

<script>
  import MainHeader from './main_header'
  import ModalSignup from '../components/modal_signup'
  import { getAccessToken, getUsername } from '../store/local_storage'

  export default {
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
