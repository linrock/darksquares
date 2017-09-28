<template lang="pug">
  section#sub-header
    header.sub-header
      slot
    .sub-header-spacer

</template>

<style lang="stylus" scoped>
  @require "../common.styl"

  .sub-header
    background #f5f5f5
    color #777
    padding-left 80px
    font-size 14px
    width 100%
    height sub-header-height
    line-height sub-header-height
    position fixed
    z-index 2
    display flex
    align-items center

  .sub-header-spacer
    height sub-header-height

</style>
