<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Recent games
      h2
        | Hover over the graphs to explore positions.
        | Click the graph to annotate.
    div(slot="dark-subheader" v-if="!isLoggedIn")
      | Annotate and share chess games with the community.
      router-link(to="/sign_up") Sign up
      | to get started
    infinite-scroll(:apiCaller="loadHomeGamesFromPage")
      card-list(:games="games")

</template>

<script>
  import CardListLayout from '../layouts/card_list_layout.vue'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { gameCache, loadHomeGames } from '../store/games'
  import { userState } from '../store/user_state'

  export default {
    data() {
      return {
        loadHomeGames,
        userState,
        games: this.filteredGames()
      }
    },

    methods: {
      filteredGames() {
        return gameCache.getGamesFromSet(`home`).filter(game => {
          return game.graphPoints || game.user.username === this.username
        })
      },
      loadHomeGamesFromPage(options) {
        return loadHomeGames(options.page).then(ids => {
          this.games = this.filteredGames()
          return ids
        })
      }
    },

    computed: {
      username() {
        return this.userState.username
      },
      isLoggedIn() {
        return !!this.username
      }
    },

    components: {
      CardListLayout,
      InfiniteScroll,
      CardList,
    }
  }
</script>
