<template>
  <svg class="d3-dot" :style="svgStyle">
    <circle></circle>
  </svg>
</template>

<script>
  import { scaleLinear, select } from 'd3'

  export default {
    props: {
      width: Number,
      height: Number,
      x: Number,
      y: Number
    },

    data: function() {
      return {
        yRange: [-5, 5]
      }
    },

    mounted: function() {
      this.$dot = this.$el.querySelector(`circle`)
      select(this.$dot)
        .attr(`style`, `fill: orange`)
        .attr(`r`, 2)
    },

    watch: {
      x: function() {
        this.drawCircle()
      }
    },

    methods: {
      drawCircle: function() {
        select(this.$dot)
          .attr(`cx`, this.x)
          .attr(`cy`, this.yValues(this.y))
      }
    },

    computed: {
      svgStyle: function() {
        return `width: ${this.width}px; height: ${this.height}px;`
      },
      yValues: function() {
        return scaleLinear().range([this.height, 0]).domain(this.yRange)
      }
    }
  }
</script>
