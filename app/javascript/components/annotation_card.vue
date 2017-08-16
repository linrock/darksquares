<template lang="pug">
  .annotation-card-container
    header
      span annotated by
      span.annotator {{ annotation.username }}
      span {{ annotation.timeAgo() }}

    .annotation-card
      .move-string {{ annotation.move_string }}
      .text {{ annotation.text }}

</template>

<script>
  import Annotation from '../models/annotation'

  export default {
    props: {
      annotation: Annotation
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation-card-container
    margin 25px 0

  header
    color rgba(0,0,0,0.4)
    font-size 12px
    margin-bottom 8px
    margin-left 3px
    
  .annotator
    font-weight bold
    margin 0 5px

  .annotation-card
    background white
    font-size 14px
    line-height 18px
    padding 15px 20px
    position relative
    width 640px

    .move-string
      font-weight bold
      margin-bottom 12px

    .text
      color rgba(0,0,0,0.7)

</style>
