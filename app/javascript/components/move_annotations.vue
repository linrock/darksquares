<template lang="pug">
  .annotations(v-if="annotations")
    annotation(
      v-for="annotation in annotations"
      :key="annotation.id"
      :annotation="annotation"
      :game="game"
    )

</template>

<script>
  import Annotation from './annotation.vue'
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
    }
  }
</script>

<style lang="stylus">

</style>
