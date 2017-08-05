<template>
  <svg class="d3-area-graph" :style="svgStyle">
    <path ref="path" :style="pathStyle"></path>
  </svg>
</template>

<script>
  import { scaleTime, scaleLinear, area, select, extent } from 'd3'

  export default {
    props: {
      points: Array,
      color: String,
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
        const areaGraph = area()
          .x(d => this.xValues(d.x))
          .y0(this.height/2)
          .y1(d => this.yValues(d.y))

        select(this.$refs.path)
          .data([this.dataPoints])
          .attr(`d`, areaGraph)
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
        return `fill: ${this.color}; stroke-width: 0;`
      },
      dataPoints: function() {
        return this.points.map((y,i) => { return { x: i, y: y } })
      }
    },
  }
</script>
