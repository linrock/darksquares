<template lang="pug">
  .infinite-scroll
    slot
    .bottom(ref="bottom" style="height: 200px")
  
</template>

<script>
  // # pixels from bottom of the page before api call triggers
  const POLL_INTERVAL = 500
  const THRESHOLD = 500

  export default {
    props: {
      apiCaller: {
        type: Function,
        required: true
      }
    },

    data() {
      return {
        page: 1,
        isFetching: false,
        interval: null
      }
    },

    methods: {
      fetchFromApi() {
        if (this.isFetching) {
          return
        }
        this.isFetching = true
        this.apiCaller({ page: this.page }).then(results => {
          if (results.length === 0) {
            console.log('no more!')
            clearInterval(this.interval)
          }
          this.page = this.page + 1
          setTimeout(() => { this.isFetching = false }, 2000)
        })
      },
      distanceFromBottom() {
        if (!this.$refs.bottom) {
          return Infinity
        }
        return this.$refs.bottom.offsetTop - (window.scrollY + window.innerHeight)
      }
    },

    created() {
      this.fetchFromApi()
      this.interval = setInterval(() => {
        if (this.distanceFromBottom() < THRESHOLD) {
          this.fetchFromApi()
        }
      }, POLL_INTERVAL)
    }
  }
</script>
