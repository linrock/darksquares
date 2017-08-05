<template>
  <div class="annotation">
    <span class="annotation-username" v-if="showUsername(annotation)">
      {{ annotation.username }}:
    </span>
    <span class="annotation-text">
      {{ annotation.text }}
    </span>
  </div>
</template>

<script>
  export default {
    props: ["annotation"],

    methods: {
      showUsername: function(annotation) {
        return annotation.username && annotation.username !== ``
      }
    }
  }
</script>

<style>
  .annotation-username {
    font-weight: bold;
  }
</style>
