<template lang="pug">
  .annotation
    annotation-content(:annotation="annotation" :game="game")

</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'
  import AnnotationContent from './annotation_content.vue'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      annotation: {
        type: Annotation,
        required: true
      }
    },

    components: {
      AnnotationContent,
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation
    position relative
    display flex

    &:hover .annotation-commands
      display block

    &:last-child
      border-bottom 0

</style>
