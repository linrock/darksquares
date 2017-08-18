<template lang="pug">
  main#about
    sub-header
      div About

    .content
      | Welcome to Dark squares, a community for collaboratively
      | annotating chess games.
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
