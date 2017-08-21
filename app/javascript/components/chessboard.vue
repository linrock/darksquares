<template lang="pug">
  .chessboard(:style="boardStyle")
    .row(v-for="j in 8")
      .square(
        v-for="i in 8"
        :class="squareClass(i - 1, j - 1)"
        :style="squareStyle"
      )
        template(v-if="pieceAt(i - 1, j - 1)")
          img(:src="pieceImgSrc(i - 1, j - 1)")

</template>

<script>
  import Chess from 'chess.js'

  export default {
    props: {
      fen: String,
      highlights: Array,
      squareSize: Number,
    },

    data: function() {
      return {
        cols: ['a','b','c','d','e','f','g','h'],
        rows: [8,7,6,5,4,3,2,1],
        ch: new Chess()
      }
    },

    mounted: function() {
      if (!this.fen) {
        return
      }
      this.renderFen(this.fen)
    },

    watch: {
      fen: function() {
        this.renderFen(this.fen)
      }
    },

    methods: {
      renderFen(fen) {
        this.ch.load(this.fen)
        this.$forceUpdate()
      },
      squareClass(i,j) {
        const sqName = this.squareName(i,j)
        if (this.highlights) {
          const hi = this.highlights.indexOf(sqName)
          return `${sqName} highlight-${hi} ${this.squareColor(i,j)}`
        } else {
          return `${sqName} ${this.squareColor(i,j)}`
        }
      },
      squareColor(i,j) {
        return (i+j) % 2 === 0 ? 'light' : 'dark'
      },
      squareName(i,j) {
        return `${this.cols[i]}${this.rows[j]}`
      },
      pieceAt(i,j) {
        const piece = this.ch.get(this.squareName(i,j))
        return piece && `${piece.color}${piece.type}`
      },
      pieceImgSrc(i,j) {
        return `/assets/pieces/${this.pieceAt(i,j)}.svg`
      }
    },

    computed: {
      boardStyle: function() {
        if (this.squareSize) {
          const boardSize = this.squareSize * 8 + 2
          return {
            width: `${boardSize}px`,
            height: `${boardSize}px`
          }
        }
      },
      squareStyle() {
        if (this.squareSize) {
          return {
            width: `${this.squareSize}px`,
            height: `${this.squareSize}px`
          }
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  square-size = 42px

  .chessboard
    border 1px solid #938172
    width 8 * square-size + 2px
    height 8 * square-size + 2px
    clearfix()

    .row
      clearfix()

    .square
      float left
      width square-size
      height square-size
      transition background 0.15s ease

      &.light
        background #f3e4cf

      &.dark
        background #ceb3a2

      &.highlight-0
        background rgb(255, 255, 204)

      &.highlight-1
        background rgb(255, 255, 102)

      img
        width 100%
        height 100%

</style>
