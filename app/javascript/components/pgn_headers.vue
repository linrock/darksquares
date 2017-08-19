<template lang="pug">
  .pgn-info
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
    margin-top 30px

  .header
    float left
    font-weight bold
    width 120px

  .value
    float left
    width 190px

</style>
