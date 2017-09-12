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
    infinite-scroll-new(routeKey="/")
      card-list(:games="homeGames")
    page-title(title="Dark Squares - share and annotate chess games")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import CardListLayout from '../layouts/card_list_layout.vue'
  import InfiniteScrollNew from '../components/infinite_scroll_new.vue'
  import CardList from '../components/card_list.vue'
  import { applyStateChange } from '../store/miniboard'
  import { gameCache } from '../store/game_cache'

  export default {
    data() {
      return {
        gamesLoaded: false,
      }
    },

    methods: {
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
      homeGames() {
        if (!this.gamesLoaded && this.homeGames.length > 0) {
          this.gamesLoaded = true
          const gameToPreview = this.homeGames[0]
          const positionIndex = 5 + ~~(Math.random() * (gameToPreview.nPoints - 5))
          this.previewGame(gameToPreview, positionIndex)
        }
      }
    },

    computed: {
      homeGames() {
        console.log(`updating home games - ${this.$store.getters.games("/").length}`)
        return this.$store.getters.games("/").filter(game => {
          return game.graphPoints || game.user.username === this.username
        })
      },
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
      InfiniteScrollNew,
      CardList,
    }
  }
</script>
