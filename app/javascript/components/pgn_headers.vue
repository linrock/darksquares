<template lang="pug">
  section.pgn-headers
    .pgn-header(v-for="row in sortedPgnHeaders" v-if="validValue(row[1])")
      .header {{ row[0] }}
      template(v-if="isValidLinkRow(row)")
        .value
          a(:href="row[1]" target="_blank")
            img(src="/icons/external-link.svg")
            | {{ extractHostname(row[1]) }}
      template(v-else)
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
      },
      isValidLinkRow(row) {
        if (row[0] !== "Site" && row[0] !== "Source") {
          return false
        }
        if (row[0] === "Site" && row[1].match(/^https?:\/\/lichess\.org/)) {
          return true
        }
        if (row[0] === "Source" &&
            (row[1].match(/^https?:\/\/www\.youtube\.com/) ||
             row[1].match(/^https?:\/\/www\.chessgames\.com/))) {
          return true
        }
        return false
      },
      extractHostname(url) {
        if (url.match(/^https?:\/\/lichess\.org/)) {
          return "lichess.org"
        } else if (url.match(/^https?:\/\/www\.youtube\.com/)) {
          return "youtube.com"
        } else if (url.match(/^https?:\/\/www\.chessgames\.com/)) {
          return "chessgames.com"
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

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
    width 213px

    img
      height 17px
      position relative
      top 2px
      margin-right 4px

    a
      display flex
      color highlight-color
      text-decoration none

      &:hover
        text-decoration underline

</style>
