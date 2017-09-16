<template lang="pug">
  .move-annotations(v-if="annotations")
    template(v-for="annotation in annotations")
      annotation-input(
        v-if="$store.getters.editingAnnotationId === annotation.id"
        :annotation="annotation"
        :moveString="annotation.move_string"
        :game="game"
      )
      annotation(
        v-else
        :key="annotation.id"
        :annotation="annotation"
        :game="game"
      )

</template>

<script>
  import Annotation from './annotation.vue'
  import AnnotationInput from './annotation_input.vue'
  import Game from '../models/game'

  export default {
    props: {
      annotations: {
        type: Array
      },
      game: {
        type: Game,
        required: true
      },
    },

    components: {
      Annotation,
      AnnotationInput
    }
  }
</script>

<style lang="stylus">

</style>
