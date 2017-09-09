<template lang="pug">
  section#user_games
    template(v-if="gamesCount >= PAGE_SIZE")
      infinite-scroll(:apiCaller="loadUserGamesFromPage")
        card-list(:games="games")
    template(v-if="gamesCount > 0 && gamesCount < PAGE_SIZE")
      card-list(:games="games")
    template(v-if="gamesCount === 0")
      .empty {{ user.username }} hasn't created any games

</template>

<script>
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { gameCache, loadUserGames } from '../store/games'
  import { PAGE_SIZE } from '../constants'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    data() {
      debugger
      return {
        PAGE_SIZE,
        gamesCount: this.user.gamesCount,
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

<style lang="stylus" scoped>
  .empty
    opacity 0.3
    padding 60px 0 0 60px

</style>
