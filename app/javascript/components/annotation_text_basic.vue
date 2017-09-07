<template lang="pug">
  .annotation-text
    .annotation-block(v-for="text in annotationBlocks") {{ text }}

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
        annotationBlocks: this.annotation.text.split(/\n{2,}/)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .annotation-block
    margin-bottom 16px

    &:last-child
      margin-bottom 0

</style>
