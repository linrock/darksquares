<template>
  <svg class="d3-vertical-line" :style="svgStyle">
    <line :x1="x" :y1="-height" :x2="x" :y2="height" :style="lineStyle"></line>
  </svg>
</template>

<script>
  export default {
    props: {
      width: Number,
      height: Number,
      x: Number,
    },

    computed: {
      svgStyle: function() {
        return `width: ${this.width}px; height: ${this.height}px;`
      },
      lineStyle: function() {
        return `stroke: rgba(0,0,0,0.3); fill: none; stroke-width: 0.5px`
      }
    }
  }
</script>
