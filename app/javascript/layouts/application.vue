<template>
  <div class="application">
    <main-header/>
    <router-view/>
  </div>
</template>

<script>
  import MainHeader from '../components/main_header'

  export default {
    components: {
      MainHeader
    }
  }
</script>

<style lang="scss" scoped>
</style>
