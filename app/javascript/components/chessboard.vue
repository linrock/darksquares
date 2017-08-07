<template>
  <div class="chessboard" :style="boardStyle">
    <div v-for="j in [0,1,2,3,4,5,6,7]" class="row">
      <div v-for="i in [0,1,2,3,4,5,6,7]" class="square"
           :class="squareClass(i,j)" :style="squareStyle">
        <template v-if="pieceAt(i,j)">
          <img :src="pieceImgSrc(i,j)">
        </template>
      </div>
    </div>
  </div>
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

    watch: {
      fen: function() {
        this.ch.load(this.fen)
        this.$forceUpdate()
      }
    },

    methods: {
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

<style lang="scss" scoped>
  $square-size: 42px;

  @mixin clearfix {
    &:before, &:after {
      content: "";
      display: table;
    }

    &:after {
      clear: both;
    }
  }

  .chessboard {
    border: 1px solid #938172;
    width: 8 * $square-size + 2px;
    height: 8 * $square-size + 2px;
    @include clearfix;

    .row {
      @include clearfix;
    }

    .square {
      float: left;
      width: $square-size;
      height: $square-size;

      &.light {
        background: #f3e4cf;
      }

      &.dark {
        background: #ceb3a2;
      }

      &.highlight-0 {
        background: rgb(255, 255, 204);
      }

      &.highlight-1 {
        background: rgb(255, 255, 102);
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
