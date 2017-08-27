<template lang="pug">
  section.pgn-headers
    .pgn-header(v-for="(value, header) in pgnHeaders" v-if="validValue(value)")
      .header {{ header }}
      .value {{ value }}

</template>

<script>
  export default {
    props: {
      pgnHeaders: {
        type: Object,
        required: true
      }
    },
    methods: {
      validValue(value) {
        return value.length > 0 && value !== '?'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .pgn-header
    font-size 14px
    line-height 18px
    display flex

  .header
    font-weight bold
    overflow-x hidden
    text-overflow ellipsis
    white-space nowrap
    width 120px

  .value
    width 190px

</style>
