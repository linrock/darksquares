<template lang="pug">
  main#game-submitter
    sub-header
      div Submit Game

    .content
      | Choose from this list of games you haven't submitted yet
</template>

<script>
  import SubHeader from '../layouts/sub_header'

  export default {
    components: {
      SubHeader,
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    display flex
    width 1200px
    margin-left 80px
    padding-top 30px

</style>
