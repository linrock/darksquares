<template lang="pug">
  section#user_annotations(v-if="user.username")
    template(v-if="annotationsCount >= PAGE_SIZE")
      infinite-scroll(:apiCaller="loadUserAnnotationsFromPage")
        card-list(:annotations="annotations")
    template(v-if="annotationsCount > 0 && annotationsCount < PAGE_SIZE")
      card-list(:annotations="annotations")
    template(v-if="annotationsCount === 0")
      .empty {{ user.username }} hasn't created any annotations

</template>

<script>
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { loadUserAnnotations } from '../store/annotations'
  import { PAGE_SIZE } from '../constants'

  export default {
    props: {
      user: {
        type: User,
        required: true
      }
    },

    data() {
      const annotations = this.user.annotations
      return {
        PAGE_SIZE,
        annotationSet: new Set(annotations),
        annotationsCount: annotations.length,
        annotations,
      }
    },

    methods: {
      loadUserAnnotationsFromPage(options) {
        const username = this.user.username
        return loadUserAnnotations(username, options.page).then(data => {
          const annotations = data.results
          annotations.forEach(annotation => this.annotationSet.add(annotation))
          this.annotations = Array.from(this.annotationSet)
          return {
            results: annotations.map(annotation => annotation.id),
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
