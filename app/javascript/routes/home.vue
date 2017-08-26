<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Recent games
      h2
        | Hover over the graphs to explore chess games.
        | Click to annotate a position.
    infinite-scroll(:apiCaller="loadHomeGamesFromPage")
      card-list(:games="games")

</template>

<script>
  import CardListLayout from '../layouts/card_list_layout.vue'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { gameCache, loadHomeGames } from '../store/games'

  export default {
    data() {
      return {
        loadHomeGames,
        games: gameCache.getGamesFromSet(`home`)
      }
    },

    methods: {
      loadHomeGamesFromPage(options) {
        return loadHomeGames(options.page).then(ids => {
          this.games = gameCache.getGamesFromSet(`home`)
          return ids
        })
      }
    },

    components: {
      CardListLayout,
      InfiniteScroll,
      CardList,
    }
  }
</script>
