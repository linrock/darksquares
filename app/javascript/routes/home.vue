<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Recent games
      h2
        | Hover over the graphs to explore chess games.
        | Click to annotate a position.
    infinite-scroll(:apiCaller="loadHomeGames")
      card-list(gameSource="home")

</template>

<script>
  import CardListLayout from '../layouts/card_list_layout.vue'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { loadHomeGames } from '../store/games'

  export default {
    data() {
      return {
        loadHomeGames
      }
    },

    components: {
      CardListLayout,
      InfiniteScroll,
      CardList,
    }
  }
</script>
