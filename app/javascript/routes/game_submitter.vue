<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Submit game
      h2 Choose a game and click `submit game` to share it on the homepage.
    card-list(:games="games")
    .directions(v-if="gamesLoaded && !games.length")
      | You must import some games before you can submit one!

</template>

<script>
  import CardListLayout from '../layouts/card_list_layout.vue'
  import CardList from '../components/card_list.vue'
  import requireLogin from './guards/require_login'
  import { gameCache, loadMyGames } from '../store/games'

  export default {
    beforeRouteEnter: requireLogin,

    mounted() {
      window.scrollTo(0, 0)
      loadMyGames().then(() => {
        this.games = this.myUnsubmittedGames(),
        this.gamesLoaded = true
      })
    },

    data() {
      const games = this.myUnsubmittedGames()
      return {
        games,
        gamesLoaded: games.length !== 0,
      }
    },

    methods: {
      myUnsubmittedGames() {
        return gameCache.getGamesFromSet('my_games').filter(game => !game.submittedAt)
      }
    },

    components: {
      CardListLayout,
      CardList,
    }
  }
</script>

<style lang="stylus" scoped>
  .directions
    margin 60px

</style>
