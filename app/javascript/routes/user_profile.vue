<template lang="pug">
  section#user_overview
    card-list(:annotations="user.annotations" :games="user.games")

</template>

<script>
  import User from '../models/user'
  import CardList from '../components/card_list'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    mounted() {
      window.scrollTo(0, 0)
    },

    components: {
      CardList
    }
  }
</script>
