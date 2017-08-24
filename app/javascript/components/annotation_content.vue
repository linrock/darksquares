<template lang="pug">
  .annotation
    .annotation-info
      router-link(:to="userPath").username(v-if="showUsername(annotation)")
        | {{ annotation.username }}
      .time-ago {{ annotation.timeAgo }}
    annotation-text(:annotation="annotation")

</template>

<script>
  import AnnotationText from './annotation_text'
  import Annotation from '../models/annotation'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      }
    },

    methods: {
      showUsername: function(annotation) {
        return annotation.username && annotation.username !== ``
      },
    },

    computed: {
      userPath() {
        return `/u/${this.annotation.username}`
      }
    },

    components: {
      AnnotationText
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation
    display block

  .annotation-info
    display flex

    .username
      font-weight bold
      font-size 12px
      color inherit
      text-decoration none

      &:hover
        text-decoration underline


    .time-ago
      margin-left 10px
      font-size 12px
      opacity 0.4

  .spacer
    width 4px

</style>
