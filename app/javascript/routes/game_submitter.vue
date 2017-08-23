<template lang="pug">
  card-list-layout
    template(slot="header")
      h1 Submit game
      h2 Choose a game and click `submit game` to share it on the homepage.
    card-list(:games="games" v-if="games.length")
    .directions(v-if="!games.length")
      | You must import some games before you can submit one!

</template>

<script>
  import CardListLayout from '../layouts/card_list_layout.vue'
  import CardList from '../components/card_list.vue'
  import { gameIdLists, gamesMap, loadMyGames } from '../store/games'

  export default {
    created: () => loadMyGames(),

    data() {
      return {
        gameIdLists
      }
    },

    computed: {
      sourceGameIds() {
        return this.gameIdLists.myGames
      },
      games() {
        return this.sourceGameIds.map(id => gamesMap[id])
          .filter(game => !game.submittedAt)
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
