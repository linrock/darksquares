<template lang="pug">
  .annotation-commands
    .edit-annotation(@click="editAnnotation") Edit
    .delete-annotation(@click="deleteAnnotation") Delete

</template>

<script>
  import Annotation from '../models/annotation'
  import Game from '../models/game'
  import { deleteAnnotation } from '../api/requests'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      annotation: {
        type: Annotation,
        required: true
      }
    },

    methods: {
      editAnnotation() {
        // make annotation input show up with text inside
        // console.log('editing')
        // this.$emit("edit-annotation", 'whoa')
      },
      deleteAnnotation() {
        if (this.annotation.id && confirm("Delete this annotation?")) {
          deleteAnnotation(this.annotation)
        }
        this.game.removeAnnotation(this.annotation)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation-commands
    margin-left auto
    display flex

    div
      margin-left 15px
      opacity 0.3
      transition opacity 0.15s ease

      &:hover
        opacity 0.5
        cursor pointer

</style>
