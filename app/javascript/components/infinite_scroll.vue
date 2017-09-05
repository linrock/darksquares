<template lang="pug">
  .infinite-scroll
    slot
    transition(name="fade")
      loading(v-if="isFetching")
    .bottom(ref="bottom" style="height: 200px")
  
</template>

<script>
  import Loading from './loading.vue'

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
        this.apiCaller({ page: this.page }).then(data => {
          if (data.results.length === 0 || data.moreResults === false) {
            console.log('no more!')
            clearInterval(this.interval)
            this.isFetching = false
            return
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
    },

    components: {
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  .infinite-scroll
    position relative

  .loading
    margin 50px 0 50px -45px
    position absolute
    left 50%

</style>
