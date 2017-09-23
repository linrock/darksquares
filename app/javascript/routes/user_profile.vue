<template lang="pug">
  section#user-overview
    template(v-if="itemsCount > 0")
      card-list(:annotations="userAnnotations" :games="userGames")
    template(v-if="itemsCount === 0")
      .empty {{ user.username }} hasn't created any games or annotations
    page-title(:title="pageTitle" v-if="pageTitle")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import User from '../models/user'
  import Loading from '../components/loading'
  import CardList from '../components/card_list'

  export default {
    props: {
      user: {
        type: User,
        required: true
      },
    },

    data() {
      return {
        itemsCount: this.user.games.length + this.user.annotations.length
      }
    },

    mounted() {
      window.scrollTo(0, 0)
    },

    computed: {
      pageTitle() {
        return this.user.username && `${this.user.username} - overview`
      },
      userGamesPath() {
        return `/u/${this.user.username}/games`
      },
      userGames() {
        return this.$store.getters.games(this.userGamesPath).slice(0, 5)
      },
      userAnnotationsPath() {
        return `/u/${this.user.username}/annotations`
      },
      userAnnotations() {
        return this.$store.getters.annotations(this.userAnnotationsPath).slice(0, 5)
      },
    },

    components: {
      PageTitle,
      Loading,
      CardList
    }
  }
</script>

<style lang="stylus" scoped>
  #user-overview
    padding-bottom 100px

  .loading
    margin 0 auto
    padding 60px 0

  .empty
    opacity 0.3
    padding 60px 0 0 60px

</style>
