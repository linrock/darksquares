<template lang="pug">
  .annotation-commands
    .edit-annotation(@click="editAnnotation")
    .delete-annotation(@click="deleteAnnotation") ×

</template>

<script>
  import Game from '../models/game'
  import Annotation from '../models/annotation'
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
      editAnnotation: function() {
        // make annotation input show up with text inside
        // console.log('editing')
        // this.$emit("edit-annotation", 'whoa')
      },
      deleteAnnotation: function() {
        if (this.annotation.id) {
          deleteAnnotation(this.annotation)
        }
        this.game.removeAnnotation(this.annotation)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .annotation-commands
    position absolute
    top 5px
    right 7px
    display none

    div
      opacity 0.3
      transition opacity 0.15s ease

      &:hover
        opacity 0.5
        cursor pointer

</style>
