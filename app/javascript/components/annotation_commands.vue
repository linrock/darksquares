<template>
  <div class="annotation-commands">
    <div class="edit-annotation" @click="editAnnotation"></div>
    <div class="delete-annotation" @click="deleteAnnotation">x</div>
  </div>
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
    top 2px
    right 5px
    display none

    div:hover
      cursor pointer

</style>
