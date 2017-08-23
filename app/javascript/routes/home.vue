<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Recent games
      h2
        | Hover over the graphs to explore chess games.
        | Click to annotate a position.
    card-list(gameSource="home")

</template>

<script>
  import CardListLayout from '../layouts/card_list_layout.vue'
  import CardList from '../components/card_list.vue'
  import { loadHomeGames } from '../store/games'

  export default {
    created: () => loadHomeGames(),

    components: {
      CardListLayout,
      CardList,
    }
  }
</script>
