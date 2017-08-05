<template>
  <div class="game-ending">{{ result }}</div>
</template>

<script>
  export default {
    props: {
      result: String,
    },
  }
</script>

<style>
  .game-ending {
    font-size: 14px;
    font-weight: bold;
    margin-top: 16px;
  }
</style>
