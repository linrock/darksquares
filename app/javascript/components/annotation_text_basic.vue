<template lang="pug">
  .annotation-text
    .annotation-block(v-for="text in annotationBlocks")
      .spacer(v-if="text === ``")
      | {{ text }}

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
      const annotationText = this.annotation.text.replace(/\n{2,}/, "\n\n")
      return {
        annotationBlocks: annotationText.split("\n")
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .spacer
    height 16px

</style>
