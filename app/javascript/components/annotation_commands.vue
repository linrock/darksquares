<template>
  <div class="annotation-commands">
    <div @click="editAnnotation"></div>
    <div class="delete-annotation" @click="deleteAnnotation">x</div>
  </div>
</template>

<script>
  import Annotation from '../models/annotation'
  import { deleteAnnotation } from '../api/requests'

  export default {
    props: {
      annotation: {
        type: Annotation,
        required: true
      }
    },

    methods: {
      editAnnotation: function() {
        // make annotation input show up with text inside
      },
      deleteAnnotation: function() {
        deleteAnnotation(this.annotation)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation-commands
    display none
    margin-left auto

    div:hover
      cursor pointer

</style>
