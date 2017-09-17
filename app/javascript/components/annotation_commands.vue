<template lang="pug">
  .annotation-commands
    .edit-annotation(
      v-if="canEditAnnotation"
      @click="editAnnotation"
    ) Edit
    .delete-annotation(@click="deleteAnnotation") Delete

</template>

<script>
  import Annotation from '../models/annotation'
  import Game from '../models/game'

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
        this.$store.dispatch('editAnnotationId', this.annotation.id)
      },
      deleteAnnotation() {
        if (confirm("Delete this annotation?")) {
          this.$store.dispatch('deleteAnnotation', {
            game: this.game,
            annotation: this.annotation
          })
        }
      }
    },

    computed: {
      username() {
        return this.$store.getters.username
      },
      canEditAnnotation() {
        return this.username === this.annotation.username
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
