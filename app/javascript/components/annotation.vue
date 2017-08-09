<template lang="pug">
  .annotation
    annotation-content(:annotation="annotation")
    annotation-commands(:game="game" :annotation="annotation")
</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'
  import AnnotationContent from './annotation_content.vue'
  import AnnotationCommands from './annotation_commands.vue'

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
      AnnotationCommands
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation
    position relative
    display flex

    &:hover .annotation-commands
      display block

</style>
