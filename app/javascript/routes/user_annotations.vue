<template lang="pug">
  section#user_annotations(v-if="user.username")
    infinite-scroll(:apiCaller="loadUserAnnotationsFromPage")
      card-list(:annotations="annotations")

</template>

<script>
  import User from '../models/user'
  import InfiniteScroll from '../components/infinite_scroll.vue'
  import CardList from '../components/card_list.vue'
  import { loadUserAnnotations } from '../store/annotations'

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
        annotationSet: new Set(annotations),
        annotations,
      }
    },

    methods: {
      loadUserAnnotationsFromPage(options) {
        const username = this.user.username
        return loadUserAnnotations(username, options.page).then(annotations => {
          annotations.forEach(annotation => this.annotationSet.add(annotation))
          this.annotations = Array.from(this.annotationSet)
          return annotations.map(annotation => annotation.id)
        })
      }
    },

    components: {
      InfiniteScroll,
      CardList,
    }
  }
</script>
