<template lang="pug">
  .infinite-scroll
    slot
    transition(name="fade")
      loading(v-if="isFetching && !isComplete")
    .bottom(ref="bottom" style="height: 200px")
  
</template>

<script>
  import Loading from './loading.vue'

  // # pixels from bottom of the page before api call triggers
  const POLL_INTERVAL = 500
  const THRESHOLD = 500

  export default {
    props: {
      routeKey: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        interval: null
      }
    },

    created() {
      if (this.isComplete) {
        return
      }
      this.fetchFromServer()
      this.interval = setInterval(() => {
        if (this.distanceFromBottom() < THRESHOLD) {
          this.fetchFromServer()
        }
      }, POLL_INTERVAL)
    },

    methods: {
      fetchFromServer() {
        if (!this.isFetching) {
          this.$store.dispatch('fetchFromServer', this.routeKey)
        }
      },
      distanceFromBottom() {
        if (!this.$refs.bottom) {
          return Infinity
        }
        return this.$refs.bottom.offsetTop - (window.scrollY + window.innerHeight)
      }
    },

    computed: {
      isFetching() {
        return this.$store.getters.isFetching(this.routeKey)
      },
      isComplete() {
        return this.$store.getters.isComplete(this.routeKey)
      }
    },

    watch: {
      isComplete() {
        if (this.isComplete) {
          console.log('infinite scroll complete!')
          clearInterval(this.interval)
        }
      }
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
