<template lang="pug">
  .loading
    | Loading
    span.ellipsis(ref="ellipsis")
      | {{ ellipsis }}

</template>

<script>
  export default {
    data() {
      return {
        ellipsis: ".",
        interval: null
      }
    },

    mounted() {
      this.interval = setInterval(() => {
        this.ellipsis = this.ellipsis.length === 3 ? "" : (this.ellipsis + ".")
      }, 300)
    },

    destroyed() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .loading
    font-size 16px
    margin 60px auto 0
    text-transform uppercase
    opacity 0.7
    width 90px

</style>
