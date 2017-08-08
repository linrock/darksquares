<template lang="pug">
  main#annotations
    .content
      h1 My annotations
      .annotation-list(v-if="annotations")
        .annotation-card(v-for="annotation in annotations")
          .move-string {{ annotation.move_string }}
          annotation-text(:annotation="annotation")

</template>

<script>
  import requireLogin from './guards/require_login'
  import { getMyAnnotations } from '../api/requests'
  import Annotation from '../models/annotation'
  import AnnotationText from '../components/annotation_text'

  export default {
    beforeRouteEnter: requireLogin,

    data() {
      return {
        annotations: null
      }
    },

    created() {
      getMyAnnotations().then(response => {
        this.annotations = response.data.map(data => new Annotation(data))
      })
    },

    components: {
      AnnotationText
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    width 1200px
    margin-left 80px
    padding-top 30px

  .annotation-card
    display flex
    margin 15px 0

    .move-string
      width 100px

    .annotation
      margin-left 15px

</style>
