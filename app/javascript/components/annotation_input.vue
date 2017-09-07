<template lang="pug">
  form.annotation-input(@submit="createAnnotation")
    textarea(
      :style="textareaStyle"
      :placeholder="textareaPlaceholder"
      ref="annotationInput"
      v-focus=""
      @input="resizeTextarea"
    )
    input(type="submit" value="Save")

</template>

<script>
  import Annotation from '../models/annotation'
  import Game from '../models/game'
  import { createAnnotation } from '../api/requests'
  import { userState } from '../store/user_state'

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

    data() {
      return {
        textareaHeight: 52,
        textareaStyle: `height: auto`
      }
    },

    methods: {
      resizeTextarea() {
        const currentHeight = this.$refs.annotationInput.scrollHeight
        if (currentHeight > this.textareaHeight) {
          this.textareaHeight = currentHeight
          this.textareaStyle = `height: ${currentHeight}px`
        }
      },
      createAnnotation(ev) {
        ev.preventDefault()
        const annotation = new Annotation({
          username: userState.username,
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
      textareaPlaceholder() {
        return `Write an annotation for ${this.moveString}`
      },
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

    input[type="submit"]
      color white
      background rgb(58, 137, 201)
      border none
      border-radius 2px
      font-size 14px
      margin 5px 0 15px
      padding 3px 0
      text-align center
      opacity 0.9
      width 70px

      &:hover
        cursor pointer
        opacity 1

    textarea
      border 1px solid rgba(0,0,0,0.05)
      border-radius 1px
      color rgba(0,0,0,0.9)
      font-size 14px
      margin-top -1px
      padding 8px 16px
      width 100%
      height 52px
      resize none

</style>
