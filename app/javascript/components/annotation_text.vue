<template lang="pug">
  .annotation
    .annotation-info
      .username(v-if="showUsername(annotation)") {{ annotation.username }}
      .time-ago {{ annotation.timeAgo() }}
    .annotation-text {{ annotation.text }}

</template>

<script>
  import Annotation from '../models/annotation'

  export default {
    props: {
      annotation: Annotation
    },

    methods: {
      showUsername: function(annotation) {
        return annotation.username && annotation.username !== ``
      }
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

    .time-ago
      margin-left 10px
      font-size 12px
      opacity 0.4

  .spacer
    width 4px

</style>
