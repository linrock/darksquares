<template lang="pug">
  .game-info
    .content(:style="contentStyle")
      .line-1 {{ line1 }}
      .line-2 {{ line2 }}
      .line-3 {{ line3 }}
    .spacer(v-if="fixed" :style="spacerStyle")

</template>

<script>
  export default {
    props: {
      pgnHeaders: {
        type: Object,
        required: true
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      gameName() {
        const event = this.pgnHeaders["Event"]
        const round = this.pgnHeaders["Round"]
        const timeControl = this.pgnHeaders["TimeControl"]
        if (event && round && round !== `-`) {
          return `${event} - Round ${round}`
        } else if (event && timeControl) {
          return `${event} - ${timeControl}`
        } else if (event) {
          return event
        } else {
          return ``
        }
      },
      line1() {
        return this.gameName
      },
      line2() {
        let line2 = ``
        if (this.players) {
          line2 = this.players
        }
        if (this.result) {
          line2 = `${line2} • ${this.result}`
        }
        return line2
      },
      line3() {
        const eco = this.pgnHeaders["ECO"]
        const opening = this.pgnHeaders["Opening"]
        return (eco && opening) ? `${eco} ${opening}` : ``
      },
      players() {
        const white = this.pgnHeaders["White"]
        const black = this.pgnHeaders["Black"]
        if (!white || !black) {
          return false
        }
        const whiteElo = Number(this.pgnHeaders["WhiteElo"])
        const blackElo = Number(this.pgnHeaders["BlackElo"])
        if (whiteElo && blackElo) {
          return `${white} (${whiteElo}) vs. ${black} (${blackElo})`
        } else {
          return `${white} vs. ${black}`
        }
      },
      result() {
        return this.pgnHeaders["Result"]
      },
      nLines() {
        let n = 0
        if (this.line1) { n = n + 1 }
        if (this.line2) { n = n + 1 }
        if (this.line3) { n = n + 1 }
        return n
      },
      contentStyle() {
        return this.fixed ? `position: fixed; z-index: 1` : ``
      },
      spacerStyle() {
        return `height: ${this.nLines * 17}px`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .game-info
    font-size 13px
    line-height 17px
    color #222

    .content
      background white
      width inherit

  .line-2
    font-weight bold

  .line-3
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

</style>
