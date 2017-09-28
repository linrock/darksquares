<template lang="pug">
  .chessboard(:style="boardStyle")
    .row(v-for="j in 8")
      .square(
        v-for="i in 8"
        :class="squareClass(i - 1, j - 1)"
        :style="squareStyle"
      )
        template(v-if="shouldShowLabels")
          .row-label(v-if="i === 1")
            | {{ rows[j - 1] }}
          .col-label(v-if="j === 8")
            | {{ cols[i - 1] }}
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
      shouldShowLabels: {
        type: Boolean,
        default: false
      },
      perspective: {
        type: String,
        default: 'white'
      }
    },

    data() {
      return {
        ch: new Chess()
      }
    },

    mounted() {
      if (!this.fen) {
        return
      }
      this.renderFen(this.fen)
    },

    watch: {
      fen() {
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
        return `/pieces/${this.pieceAt(i,j)}.svg`
      }
    },

    computed: {
      cols() {
        let cols = ['a','b','c','d','e','f','g','h']
        return this.perspective === 'white' ? cols : cols.reverse()
      },
      rows() {
        let rows = [8,7,6,5,4,3,2,1]
        return this.perspective === 'white' ? rows : rows.reverse()
      },
      boardStyle() {
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
  @require "../common.styl"

  square-size = 42px
  dark-square-color = #ceb3a2
  light-square-color = #f3e4cf

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
      position relative

      &.light
        background light-square-color

        .row-label, .col-label
          color dark-square-color

      &.dark
        background dark-square-color

        .row-label, .col-label
          color light-square-color

      &.highlight-0
        background rgb(255, 255, 204)

      &.highlight-1
        background rgb(255, 255, 102)

      .row-label, .col-label
        position absolute
        font-size 10px
        opacity 0.9
        z-index 0

      .row-label
        left 3px
        top 3px

      .col-label
        right 3px
        bottom 3px

      img
        width 100%
        height 100%
        position relative
        z-index 1

</style>
