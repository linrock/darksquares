<template lang="pug">
  .annotation-content
    annotation-text-basic(:annotation="annotation")
    .annotation-info
      template(v-if="!annotation.annotator")
        span.author
          router-link.username(:to="userPath" v-if="showUsername(annotation)")
            | {{ annotation.username }}
          span.time-ago {{ annotation.timeAgo }}
      template(v-if="annotation.annotator")
        span.annotator
          | {{ annotation.annotator }}

</template>

<script>
  import AnnotationTextBasic from './annotation_text_basic'
  import Annotation from '../models/annotation'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      }
    },

    methods: {
      showUsername(annotation) {
        return annotation.username && annotation.username !== ``
      },
    },

    computed: {
      userPath() {
        return `/u/${this.annotation.username}`
      }
    },

    components: {
      AnnotationTextBasic
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .annotation-content
    display block
    color rgba(0,0,0,0.9)
    font-size 14px
    line-height 20px
    padding 12px 18px
    width 100%

  .annotation-text
    display inline

  .annotation-info
    font-size 11px
    white-space nowrap
    margin-top 6px

    .prefix
      display inline
      margin-right 4px

    .author
      .username
        color highlight-color
        display inline
        opacity 0.9
        text-decoration none

        &:hover
          text-decoration underline

      .time-ago
        display inline
        margin-left 6px
        opacity 0.2

    .annotator
      color rgba(0,0,0,0.3)

</style>
