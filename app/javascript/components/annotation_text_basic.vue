<template lang="pug">
  .annotation-text
    .annotation-block(v-for="text in annotationBlocks")
      .spacer(v-if="text === ``")
      .tabber(v-if="text[0] === ` ` && text[1] === ` `") &nbsp;&nbsp;
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

  .tabber
    display inline

</style>
