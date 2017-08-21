<template lang="pug">
  svg.d3-vertical-line(:style="svgStyle")
    line(:x1="x" :y1="-height" :x2="x" :y2="height")

</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      x: {
        type: Number,
        required: true
      }
    },

    computed: {
      svgStyle() {
        return `width: ${this.width}px; height: ${this.height}px`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  svg.d3-vertical-line
    stroke rgba(0,0,0,0.4)
    fill none
    stroke-width 0.5px

</style>
