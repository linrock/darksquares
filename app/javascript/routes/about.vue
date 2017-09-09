<template lang="pug">
  main#about
    .content
      p
        | Dark Squares is a community for sharing and
        br
        | collaboratively annotating chess games.

      p
        | It's currently in beta. Feel free to email me
        br
        | with your thoughts and suggestions.

      p
        a(href="mailto:admin@darksquares.com")
          | admin@darksquares.com

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
  @import "../common.styl"

  .content
    width 1200px
    margin-left 80px
    padding-top 80px
    font-size 14px
    line-height 22px

    p
      display block
      margin-bottom 22px

    a
      color highlight-color
      text-decoration none

      &:hover
        text-decoration underline

</style>
