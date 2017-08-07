<template lang="pug">
  .annotation
    annotation-text(:annotation="annotation")
    annotation-commands(:annotation="annotation")
</template>

<script>
  import Annotation from '../models/annotation'
  import AnnotationText from './annotation_text.vue'
  import AnnotationCommands from './annotation_commands.vue'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      }
    },
    components: {
      AnnotationText,
      AnnotationCommands
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation
    display flex

    &:hover .annotation-commands
      display block

</style>
