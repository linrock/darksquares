<template lang="pug">
  .annotation
    annotation-text(:annotation="annotation")

</template>

<script>
  import Annotation from '../models/annotation'
  import AnnotationText from './annotation_text.vue'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      }
    },
    components: {
      AnnotationText
    }
  }
</script>
