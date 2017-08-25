<template lang="pug">
  section#user_games(v-if="user.username")
    infinite-scroll(:apiCaller="loadUserGamesFromPage")
      card-list(gameSource="userGames" :username="user.username")

</template>

<script>
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { loadUserGames } from '../store/games'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    methods: {
      loadUserGamesFromPage(options) {
        return loadUserGames({ username: this.user.username, page: options.page })
      }
    },

    components: {
      InfiniteScroll,
      CardList,
    }
  }
</script>
