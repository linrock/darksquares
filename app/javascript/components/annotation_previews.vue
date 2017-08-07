<template lang="pug">
  .annotation-previews
    .preview(v-for="(annotation, i) in annotationPreviews")
      span.username {{ annotation.username }}
      span.move-string {{ annotation.move_string }}
      span.text {{ annotation.text }}

</template>

<script>
  export default {
    props: {
      annotations: Array
    },

    computed: {
      annotationPreviews: function() {
        let annotations = []
        for (let j = 0, l = this.annotations.length; j < l; j++) {
          if (this.annotations[j]) {
            annotations.push(this.annotations[j])
            if (annotations.length >= 3) {
              break
            }
          }
        }
        return annotations
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .preview
    font-size 12px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    margin 5px 0 10px
    color #333
    opacity 0.9
    clear left

    .username
      font-weight bold

    .move-string
      margin 0 10px 0 7px
      opacity 0.7

    .text
      opacity 0.5

    &:last-child
      margin-bottom 0

</style>
