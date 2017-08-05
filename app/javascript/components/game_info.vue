<template>
  <div class="game-info">
    <div>
      {{ line1 }}
    </div>
    <div class="line-2">
      {{ line2 }}
    </div>
    <div class="line-3">
      {{ line3 }}
    </div>
  </div>
</template>

<script>
  import Chess from 'chess.js'

  export default {
    props: {
      pgnHeaders: Object
    },

    computed: {
      gameName: function() {
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
      line1: function() {
        return this.gameName
      },
      line2: function() {
        if (this.players) {
          return `${this.players} • ${this.result}`
        } else {
          return ``
        }
      },
      line3: function() {
        const eco = this.pgnHeaders["ECO"]
        const opening = this.pgnHeaders["Opening"]
        if (eco && opening) {
          return `${eco} ${opening}`
        } else {
          return ``
        }
      },
      players: function() {
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
      result: function() {
        return this.pgnHeaders["Result"]
      },
    }
  }
</script>

<style lang="scss" scoped>
  .game-info {
    font-size: 13px;
    line-height: 17px;
    height: 3 * 17px;
    color: #222;
  }

  .line-2 {
    font-weight: bold;
  }

  .line-3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
