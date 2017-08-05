<template>
  <svg class="d3-line-graph" :style="svgStyle">
    <path ref="path" :style="pathStyle"></path>
  </svg>
</template>

<script>
  import { scaleTime, scaleLinear, line, select, extent } from 'd3'

  export default {
    props: {
      points: Array,
      color: String,
      strokeWidth: Number,
      width: Number,
      height: Number
    },

    data: function() {
      return {
        yRange: [-5, 5]
      }
    },

    mounted: function() {
      this.plotPoints()
    },

    methods: {
      plotPoints: function() {
        const linePoints = line()
          .x(d => this.xValues(d.x))
          .y(d => this.yValues(d.y))

        select(this.$refs.path)
          .data([this.dataPoints])
          .attr(`d`, linePoints)
      }
    },

    computed: {
      xValues: function() {
        return scaleTime().range([0, this.width]).domain(extent(this.dataPoints, d => d.x))
      },
      yValues: function() {
        return scaleLinear().range([this.height, 0]).domain(this.yRange)
      },
      svgStyle: function() {
        return `width: ${this.width}px; height: ${this.height}px;`
      },
      pathStyle: function() {
        return `fill: none; stroke: ${this.color}; stroke-width: ${this.strokeWidth}`
      },
      dataPoints: function() {
        return this.points.map((y,i) => { return { x: i, y: y } })
      }
    },
  }
</script>
