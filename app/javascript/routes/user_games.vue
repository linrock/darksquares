<template lang="pug">
  section#user_games(v-if="user.username")
    infinite-scroll(:apiCaller="loadUserGamesFromPage")
      card-list(:games="games")

</template>

<script>
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { gameCache, loadUserGames } from '../store/games'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    data() {
      return {
        games: this.user.games
      }
    },

    methods: {
      loadUserGamesFromPage(options) {
        const username = this.user.username
        return loadUserGames({ username, page: options.page }).then(data => {
          this.games = gameCache.getGamesFromSet(`user-${username}`)
          return {
            results: data.results,
            moreResults: data.moreResults
          }
        })
      }
    },

    components: {
      InfiniteScroll,
      CardList,
    }
  }
</script>
