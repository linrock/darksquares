<template>
  <div class="application">
    <main-header/>
    <router-view/>
  </div>
</template>

<script>
  import MainHeader from './main_header'

  export default {
    components: {
      MainHeader
    }
  }
</script>
