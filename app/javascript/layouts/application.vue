<template>
  <div class="application">
    <main-header/>
    <router-view/>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import MainHeader from '../components/main_header'

  export default {
    components: {
      MainHeader
    }
  }
</script>

<style>
</style>
