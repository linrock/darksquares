<template lang="pug">
  .annotation-text(@mouseenter="renderMoveStrings")
    span(v-for="fragment in annotationFragments")
      span.text(v-if="typeof fragment === 'string'") {{ fragment }}
      hover-move(v-if="typeof fragment === 'object'"
                :moveString="fragment.text"
                :fen="fragment.fen")

</template>

<script>
  import HoverMove from '../components/hover_move'
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
        annotationFragments: [this.annotation.text],
      }
    },

    methods: {
      renderMoveStrings: function() {
        if (this.checkedForMoveStrings) {
          return
        }
        this.annotationFragments = this.annotation.fragments
        this.checkedForMoveStrings = true
      }
    },

    components: {
      HoverMove
    }
  }
</script>

<style lang="stylus" scoped>
  .hover-move
    text-decoration underline

    &:hover
      cursor crosshair

</style>
