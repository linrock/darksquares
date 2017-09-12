<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Recent games
      h2
        | Hover over the graphs to preview positions on the board.
        | Click a graph to explore the game.
    div(slot="dark-subheader" v-if="!isLoggedIn")
      | Share and annotate chess games with the community.
      router-link(to="/sign_up") Sign up
      | to get started.
    infinite-scroll(:apiCaller="loadHomeGamesFromPage")
      card-list(:games="games")
    page-title(title="Dark Squares - share and annotate chess games")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import CardListLayout from '../layouts/card_list_layout.vue'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { gameCache, loadHomeGames } from '../store/games'
  import { applyStateChange } from '../store/miniboard'

  export default {
    data() {
      return {
        loadHomeGames,
        games: this.filteredGames(),
        gamesLoaded: false,
      }
    },

    methods: {
      filteredGames() {
        return gameCache.getGamesFromSet(`home`).filter(game => {
          return game.graphPoints || game.user.username === this.username
        })
      },
      loadHomeGamesFromPage(options) {
        return loadHomeGames(options.page).then(data => {
          this.gamesLoaded = true
          this.games = this.filteredGames()
          return data
        })
      },
      previewGame(game, positionIndex) {
        const state = Object.assign(
          { pgnHeaders: game.pgnHeaders },
          game.stateAtPositionIndex(positionIndex),
        )
        applyStateChange(state)
        this.$store.dispatch(`setActiveGameKey`, game.key)
      }
    },

    watch: {
      gamesLoaded() {
        const gameToPreview = this.games[0]
        const positionIndex = 5 + ~~(Math.random() * (gameToPreview.nPoints - 5))
        this.previewGame(gameToPreview, positionIndex)
      }
    },

    computed: {
      username() {
        return this.$store.state.currentUser.username
      },
      isLoggedIn() {
        return !!this.username
      }
    },

    components: {
      PageTitle,
      CardListLayout,
      InfiniteScroll,
      CardList,
    }
  }
</script>
