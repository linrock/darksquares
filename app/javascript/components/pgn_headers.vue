<template lang="pug">
  section.pgn-headers
    .pgn-header(v-for="row in sortedPgnHeaders" v-if="validValue(row[1])")
      .header {{ row[0] }}
      .value {{ row[1] }}

</template>

<script>
  export default {
    props: {
      pgnHeaders: {
        type: Object,
        required: true
      }
    },
    computed: {
      sortedPgnHeaders() {
        const pgnHeadersArray = []
        const keys = Object.keys(this.pgnHeaders).sort()
        keys.forEach(key => {
          pgnHeadersArray.push([key, this.pgnHeaders[key]])
        })
        return pgnHeadersArray
      }
    },
    methods: {
      validValue(value) {
        return value.length > 0 && value !== '?' && !value.match(/\?{2,}/) && value !== '-'
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
    width 125px

  .value
    width 185px

</style>
