<template lang="pug">
  main#card-list-layout
    .left-content
      mini-board-detailed(:showPgn="true")
    .right-content
      header.main
        slot(name="header")
      header.dark-subheader
        slot(name="dark-subheader")
      .content
        slot

</template>

<script>
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'

  export default {
    components: {
      MiniBoardDetailed
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  main
    width 100%
    height 100%
    min-height 1000px

  .left-content
    background white
    width 420px
    height "calc(100% - %s)" % main-header-height
    position fixed
    top main-header-height
    padding-bottom 20px
    overflow-y scroll

    .mini-board-view
      margin 30px 0 0 40px
      width 338px

  .right-content
    width 100%
    height 100%
    padding-left 420px
    background #f7f7f7

    header.main
      background #393939
      padding 29px 0 19px 60px
      height 100px

      h1
        color white
        font-size 20px
        margin 0

      h2
        color #cacaca
        font-size 12px
        margin 10px 0

    header.dark-subheader
      background #595959
      font-size 15px
      color rgba(255,255,255,0.9)

      div
        padding 15px 0 15px 60px

      a
        color white
        font-weight bold
        text-decoration none
        margin 0 5px
        opacity 1

        &:hover
          text-decoration underline

    .content
      min-height 1000px
      height 100%

</style>
