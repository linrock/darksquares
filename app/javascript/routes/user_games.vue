<template lang="pug">
  section#user_games
    infinite-scroll(:apiCaller="loadMyGames")
      card-list(gameSource="myGames")

</template>

<script>
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { loadMyGames } from '../store/games'

  export default {
    data() {
      return {
        loadMyGames
      }
    },

    props: {
      user: {
        type: User,
        required: true
      }
    },

    components: {
      InfiniteScroll,
      CardList,
    }
  }
</script>
