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
    background #fcfcfc
    color rgba(0,0,0,0.8)
    font-size 13px
    line-height 20px
    padding 10px 15px

    p
      margin 0

  .annotation-info
    display flex
    margin-bottom 3px

    .username
      font-weight bold
      color inherit
      text-decoration none

      &:hover
        text-decoration underline

    .time-ago
      margin-left 10px
      opacity 0.4

  .spacer
    width 4px

</style>
