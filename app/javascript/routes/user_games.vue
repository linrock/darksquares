<template lang="pug">
  section#user_games
    card-list(:games="user.games")

</template>

<script>
  import User from '../models/user'
  import CardList from '../components/card_list.vue'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    components: {
      CardList
    }
  }
</script>
