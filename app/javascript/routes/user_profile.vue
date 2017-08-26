<template lang="pug">
  section#user_overview
    loading(v-if="isLoading")
    card-list(:annotations="user.annotations" :games="user.games")

</template>

<script>
  import User from '../models/user'
  import Loading from '../components/loading'
  import CardList from '../components/card_list'

  export default {
    props: {
      user: {
        type: User,
        required: true
      },
      isLoading: {
        type: Boolean
      }
    },

    mounted() {
      window.scrollTo(0, 0)
    },

    components: {
      Loading,
      CardList
    }
  }
</script>

<style lang="stylus" scoped>
  .loading
    margin 0 auto
    padding 60px 0

</style>
