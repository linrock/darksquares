<template lang="pug">
  .application
    main-header
    router-view

</template>

<script>
  import MainHeader from './main_header'

  export default {
    components: {
      MainHeader
    }
  }
</script>
