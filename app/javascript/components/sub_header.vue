<template lang="pug">
  section#sub-header
    header.sub-header
      slot
    .sub-header-spacer

</template>

<style lang="stylus" scoped>
  .sub-header
    background rgba(0,0,0,0.05)
    padding-left 80px
    font-size 14px
    width 100%
    height 36px
    line-height 36px
    position fixed

  .sub-header-spacer
    height 36px

</style>
