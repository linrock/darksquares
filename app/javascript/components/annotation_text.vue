<template>
  <div class="annotation">
    <span class="annotation-username" v-if="showUsername(annotation)">
      {{ annotation.username }}:
    </span>
    <span class="spacer"></span>
    <span class="annotation-text">
      {{ annotation.text }}
    </span>
  </div>
</template>

<script>
  import Annotation from '../models/annotation'

  export default {
    props: {
      annotation: Annotation
    },

    methods: {
      showUsername: function(annotation) {
        return annotation.username && annotation.username !== ``
      }
    }
  }
</script>

<style lang="scss" scoped>
  .annotation-username {
    font-weight: bold;
  }

  .spacer {
    width: 4px;
  }
</style>
