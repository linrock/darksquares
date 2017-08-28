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
  import { getUsername } from '../store/local_storage'
  import { modalState } from '../store/modal_state'
  import { userState } from '../store/user_state'

  export default {
    data() {
      return {
        modalState
      }
    },

    created() {
      userState.username = getUsername()
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
