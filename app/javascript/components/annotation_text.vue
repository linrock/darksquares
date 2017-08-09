<template lang="pug">
  .annotation-text(@mouseenter="renderMoveStrings") {{ annotation.text }}
</template>

<script>
  import Annotation from '../models/annotation'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      }
    },

    data() {
      return {
        checkedForMoveStrings: false,
        moveStrings: []
      }
    },

    methods: {
      renderMoveStrings: function() {
        if (this.checkedForMoveStrings) {
          return
        }
        this.annotation.mapMoveStringsToPositions()
        this.checkedForMoveStrings = true
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
