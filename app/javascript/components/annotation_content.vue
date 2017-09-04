<template lang="pug">
  .annotation-content
    annotation-text(:annotation="annotation")
    .annotation-info
      template(v-if="!annotation.annotator")
        span.author
          span.prefix &ndash;
          router-link.username(:to="userPath" v-if="showUsername(annotation)")
            | {{ annotation.username }}
          span.time-ago {{ annotation.timeAgo }}
      template(v-if="annotation.annotator")
        span.annotator
          span.prefix &ndash;
          | {{ annotation.annotator }}

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
      AnnotationText
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .annotation-content
    display block
    background #fcfcfc
    color rgba(0,0,0,0.9)
    font-size 13px
    line-height 20px
    padding 8px 16px
    width 100%

  .annotation-text
    display inline

  .annotation-info
    display inline
    white-space nowrap
    margin-bottom 3px

    .prefix
      display inline
      margin 0 3px 0 8px

    .author
      .prefix
        opacity 0.6

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
