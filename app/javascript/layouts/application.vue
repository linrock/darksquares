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

  export default {
    components: {
      MainHeader,
      ModalSignup
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"
</style>
