<template lang="pug">
  section#user_games
    template(v-if="gamesCount >= PAGE_SIZE")
      infinite-scroll(:routeKey="userGamesPath")
        card-list(:games="userGames")
    template(v-if="gamesCount > 0 && gamesCount < PAGE_SIZE")
      card-list(:games="games")
    template(v-if="gamesCount === 0")
      .empty {{ user.username }} hasn't created any games
    page-title(:title="pageTitle" v-if="pageTitle")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { loadUserGames } from '../store/games'
  import { gameCache } from '../store/game_cache'
  import { PAGE_SIZE } from '../constants'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    data() {
      return {
        PAGE_SIZE,
        gamesCount: this.user.gamesCount,
        games: this.user.games
      }
    },

    computed: {
      pageTitle() {
        return this.user.username && `${this.user.username} - Games`
      },
      userGamesPath() {
        return `/u/${this.user.username}/games`
      },
      userGames() {
        return this.$store.getters.games(this.userGamesPath)
      }
    },

    components: {
      PageTitle,
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
