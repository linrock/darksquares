<template lang="pug">
  section.pgn-headers-editor
    .pgn-header(v-for="(header, i) in pgnHeaders")
      input.header.mousetrap(type="text" :value="header[0]" @input="updateHeadersData")
      input.value.mousetrap(type="text" :value="header[1]" @input="updateHeadersData")

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

    data() {
      return {
        pgnHeaders: Object.keys(this.game.pgnHeaders).map(key => [key, this.game.pgnHeaders[key]])
      }
    },

    created() {
      Mousetrap.bind('enter', () => this.addBlankHeader())
    },

    destroyed() {
      Mousetrap.unbind('enter')
    },

    methods: {
      getPgnHeadersArray() {
        const headersArray = []
        const headersEl = [...this.$el.querySelectorAll(".pgn-header")]
        headersEl.map(h => [...h.children].map(input => input.value)).forEach(pair => {
          headersArray.push(pair)
        })
        return headersArray
      },
      updateHeadersData() {
        this.getPgnHeadersArray().forEach((pair, i) => {
          this.pgnHeaders[i] = pair
        })
      },
      addBlankHeader() {
        if (this.pgnHeaders.some(header => header[0].trim() === "")) {
          return
        }
        this.pgnHeaders = [...this.pgnHeaders, ["", ""]]
        this.$forceUpdate()
        requestAnimationFrame(() => {
          const headerInputs = this.$el.querySelectorAll("input.header")
          headerInputs[headerInputs.length - 1].focus()
        })
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
