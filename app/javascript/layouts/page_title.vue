<script>
  const TITLE = `Dark Squares`

  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },

    render() {
      if (!this.title) {
        document.title = TITLE
      } else if (this.title.indexOf(TITLE) === 0) {
        document.title = this.title
      } else {
        document.title = `${this.title} | ${TITLE}`
      }
    }
  }
</script>
