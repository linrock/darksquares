<template lang="pug">
  form.annotation-input(@submit="createAnnotation")
    input(type="text" :placeholder="inputPlaceholder" ref="annotationInput" v-focus="")

</template>

<script>
  import Annotation from '../models/annotation'
  import Game from '../models/game'
  import { getUsername } from '../store/local_storage'
  import { createAnnotation } from '../api/requests'

  export default {
    props: {
      game: {
        type: Game,
        required: true
      },
      moveString: {
        type: String,
        required: true
      },
    },

    methods: {
      createAnnotation: function(ev) {
        ev.preventDefault()
        const annotation = new Annotation({
          username: getUsername(),
          move_string: this.moveString,
          text: this.$refs.annotationInput.value
        })
        this.$refs.annotationInput.value = ''
        this.game.addAnnotation(annotation)
        createAnnotation(this.game.id, annotation).then(response => {
          this.game.annotations[this.game.annotations.length - 1].id = response.data.id
        })
        this.$emit(`annotation-created`)
      }
    },

    computed: {
      inputPlaceholder: function() {
        return `Write an annotation for ${this.moveString}`
      }
    },

    directives: {
      focus: {
        inserted: el => el && el.focus()
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .annotation-input
    float left
    clear left
    margin 10px 0

    input
      font-size 14px
      width 530px
      padding 3px

</style>
