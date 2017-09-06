<template lang="pug">
  section.pgn-headers-editor
    .pgn-header(v-for="(value, header) in game.pgnHeaders")
      input.header.mousetrap(type="text" :value="header" @keyup="updateHeaders")
      input.value.mousetrap(type="text" :value="value" @keyup="updateHeaders")

</template>

<script>
  import Mousetrap from 'mousetrap'
  import Game from '../models/game'

  export default {
    props: {
      game: {
        type: Game,
        required: true,
      },
    },

    created() {
      Mousetrap.bind('enter', () => this.addBlankHeader())
    },

    destroyed() {
      Mousetrap.unbind('enter')
    },

    methods: {
      updateHeaders() {
        const newPgnHeaders = {}
        ;[...this.$el.querySelectorAll(".pgn-header")].map(headers => {
          return [...headers.children].map(input => input.value)
        }).forEach(pair => {
          const header = pair[0]
          const value = pair[1]
          newPgnHeaders[header] = value
        })
        this.game.pgnHeaders = newPgnHeaders
      },
      addBlankHeader() {
        const blank = this.game.pgnHeaders[""]
        if (!blank) {
          this.game.pgnHeaders[""] = ""
          this.$forceUpdate()
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  input
    font-size 14px
    line-height 18px

  .pgn-header, .new-pgn-header
    display flex

  .header
    font-weight bold
    width 150px

  .value
    width 250px

</style>
