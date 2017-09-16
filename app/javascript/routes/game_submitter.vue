<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Submit game
      h2 Choose a game and click `submit game` to share it on the homepage.
    infinite-scroll(:routeKey="userLink")
      card-list(:games="unsubmittedGames")
    .directions(v-if="gamesLoaded && !unsubmittedGames.length")
      | You must import some games before you can submit a game!
    page-title(title="Submit game")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import CardListLayout from '../layouts/card_list_layout.vue'
  import CardList from '../components/card_list.vue'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import requireLogin from './guards/require_login'

  export default {
    beforeRouteEnter: requireLogin,

    mounted() {
      window.scrollTo(0, 0)
    },

    computed: {
      userLink() {
        return `/u/${this.$store.getters.username}/games`
      },
      gamesLoaded() {
        return this.$store.getters.hasFetched(this.userLink)
      },
      userGames() {
        return this.$store.getters.games(this.userLink)
      },
      unsubmittedGames() {
        return this.userGames.filter(game => !game.submittedAt)
      }
    },

    components: {
      PageTitle,
      CardListLayout,
      CardList,
      InfiniteScroll,
    }
  }
</script>

<style lang="stylus" scoped>
  .directions
    margin-left 60px

</style>
