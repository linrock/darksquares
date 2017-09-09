<template lang="pug">
  section#user_overview
    template(v-if="itemsCount > 0")
      loading(v-if="isLoading")
      card-list(:annotations="user.annotations" :games="user.games")
    template(v-if="itemsCount === 0")
      .empty {{ user.username }} hasn't created any games or annotations

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

    data() {
      return {
        itemsCount: this.user.games.length + this.user.annotations.length
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

  .empty
    opacity 0.3
    padding 60px 0 0 60px

</style>
