<template lang="pug">
  .stacked-graphs(:style="style")
    .graph(v-for="(points, i) in listOfPoints")
      d3-line-graph(
        :points="points" :color="getColor(i)" :width="width" :height="height" :strokeWidth="1"
      )
      d3-area-graph(
        v-if="i === nLines - 1"
        :points="points" :color="getColor(i)" :width="width" :height="height"
      )

</template>

<script>
  import D3LineGraph from './d3_line_graph'
  import D3AreaGraph from './d3_area_graph'

  export default {
    props: {
      listOfPoints: [Array],
      width: Number,
      height: Number,
    },

    methods: {

      // Fire colors
      getColor(i) {
        if (i == this.nLines - 1) {
          return "rgba(51,10,4,0.6)"
        }
        return [
          "rgba(239,172,65,0.5)",
          "rgb(239,172,65)",
          "rgb(222,133,49)",
          "rgb(179,41,0)",
          "rgb(108,19,5)",
          "rgb(51,10,4)",
        ][i]
      },

      // Fire colors 2
      getColor(i) {
        if (i == this.nLines - 1) {
          return "rgba(255,111,41,0.7)"
        }
        return [
          "rgba(252,238,51,0.5)",
          "rgb(252,238,51)",
          "rgba(246,168,32,0.5)",
          "rgb(246,168,32)",
          "rgba(243,18,14,0.5)",
          "rgb(243,18,14)",
        ][i]
      },

      // Light blue
      getColor(i) {
        if (i === this.nLines - 1) {
          return "rgba(58,137,201,0.6)"
        }
        return [
          "rgba(233,242,249,0.6)",
          "rgba(233,242,249,0.8)",
          "rgba(233,242,249,1)",
          "rgba(156,196,228,0.6)",
          "rgba(156,196,228,0.8)",
          "rgba(156,196,228,1)",
          "rgba(27,50,95,0.8)"
        ][i]
      },

      getColor(i) {
        // let rgb = [70, 130, 180]  // steel blue
        let rgb = [58, 137, 201]  // vivid blue - colourlovers.com/palette/27905
        // let rgb = [242,108,79]  // vivid orange - colourlovers.com/paeltte/27905
        if (i === this.nLines - 1) {
          return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`
        }
        let opacity = (i + 1) / this.nLines
        let color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`
        return color
      },
    },

    computed: {
      nLines: function() {
        return this.listOfPoints.length
      },
      style: function() {
        return `width: ${this.width}px; height: ${this.height}px`
      },
    },

    components: {
      D3LineGraph,
      D3AreaGraph
    }
  }
</script>

<style lang="stylus" scoped>
  .stacked-graphs
    position relative

    .d3-line-graph, .d3-area-graph
      position absolute
      left 0
      top 0

</style>
