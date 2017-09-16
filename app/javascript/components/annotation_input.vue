<template lang="pug">
  form.annotation-input(@submit="createAnnotation")
    textarea(
      :style="textareaStyle"
      :placeholder="textareaPlaceholder"
      ref="input"
      v-focus=""
      @input="resizeTextarea"
    )
    .under-input
      input(type="submit" value="Save")
      template(v-if="username === game.username")
        input(type="text" placeholder="Annotator (optional)" ref="annotator")

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
      moveString: {
        type: String,
        required: true
      },
    },

    data() {
      return {
        textareaHeight: 64,
        textareaStyle: `height: auto`,
      }
    },

    methods: {
      resizeTextarea() {
        const currentHeight = this.$refs.input.scrollHeight + 2
        if (currentHeight > this.textareaHeight) {
          this.textareaHeight = currentHeight
          this.textareaStyle = `height: ${currentHeight}px`
        }
      },
      createAnnotation(ev) {
        ev.preventDefault()
        const annotation = new Annotation({
          username: this.username,
          move_string: this.moveString,
          text: this.$refs.input.value,
          gameId: this.game.id,
        })
        this.$refs.input.value = ''
        if (this.$refs.annotator) {
          const annotator = this.$refs.annotator.value.trim()
          if (annotator !== '') {
            annotation.annotator = annotator
            this.$refs.annotator.value = ''
          }
        }
        this.$store.dispatch('createAnnotation', { game: this.game, annotation })
        this.$emit(`annotation-created`)
      }
    },

    computed: {
      username() {
        return this.$store.getters.username
      },
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
  @import "../common.styl"

  .annotation-input
    float left
    clear left
    margin 10px 0
    width 100%

    input[type="submit"]
      color white
      background highlight-color
      border none
      border-radius 2px
      font-size 14px
      padding 4px 0
      text-align center
      opacity 0.9
      width 70px

      &:hover
        cursor pointer
        opacity 1

    input[type="text"]
      border 1px solid rgba(0,0,0,0.05)
      border-radius 2px
      color rgba(0,0,0,0.9)
      font-size 12px
      padding 4px 10px
      margin-left 10px
      width 250px

    textarea
      border 1px solid rgba(0,0,0,0.05)
      border-radius 2px
      color rgba(0,0,0,0.9)
      font-size 14px
      line-height 20px
      margin-top -1px
      padding 12px 17px
      width 100%
      height 64px
      resize none

    .under-input
      margin 5px 0 15px
      display flex

</style>
