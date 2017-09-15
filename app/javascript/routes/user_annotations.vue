<template lang="pug">
  section#user_annotations
    template(v-if="annotationsCount >= PAGE_SIZE")
      infinite-scroll(:routeKey="userAnnotationsPath")
        card-list(:annotations="userAnnotations")
    template(v-if="annotationsCount > 0 && annotationsCount < PAGE_SIZE")
      card-list(:annotations="userAnnotations")
    template(v-if="annotationsCount === 0")
      .empty {{ user.username }} hasn't created any annotations
    page-title(:title="pageTitle" v-if="pageTitle")

</template>

<script>
  import PageTitle from '../layouts/page_title'
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
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
        annotationsCount: this.user.annotationsCount,
      }
    },

    computed: {
      pageTitle() {
        return this.user.username && `${this.user.username} - Annotations`
      },
      userAnnotationsPath() {
        return `/u/${this.user.username}/annotations`
      },
      userAnnotations() {
        return this.$store.getters.annotations(this.userAnnotationsPath)
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
