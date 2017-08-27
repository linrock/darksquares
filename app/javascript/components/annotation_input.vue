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
      createAnnotation(ev) {
        ev.preventDefault()
        const annotation = new Annotation({
          username: getUsername(),
          move_string: this.moveString,
          text: this.$refs.annotationInput.value
        })
        this.$refs.annotationInput.value = ''
        this.game.addAnnotation(annotation)
        createAnnotation(this.game.id, annotation).then(response => {
          const newAnnotation = this.game.annotations.find(annotation => {
            return !annotation.id && annotation.move_string === this.moveString
          })
          newAnnotation.id = response.data.annotation.id
          newAnnotation.game = this.game
        })
        this.$emit(`annotation-created`)
      }
    },

    computed: {
      inputPlaceholder() {
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
    width 100%

    input
      font-size 13px
      width 100%
      padding 8px 16px
      margin-top 1px
      border 1px solid rgba(0,0,0,0.05)

    textarea
      color rgba(0,0,0,0.9)
      font-size 13px
      padding 7px 15px
      width 100%
      height 48px

</style>
