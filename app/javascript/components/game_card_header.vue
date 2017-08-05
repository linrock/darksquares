<template>
  <div class="game-card-header" v-if="gameData.meta">
    <span class="game-card-name">{{ gameData.meta.name }}</span>
    <span class="game-card-submitter" v-if="gameData.meta.submitter">
      &nbsp;&ndash;&nbsp; submitted by {{ gameData.meta.submitter }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      gameIndex: Number,
      gameData: Object,
    }
  }
</script>

<style>
  .game-card-header {
    color: rgba(0,0,0,0.4);
    font-size: 13px;
    margin-bottom: 8px;
    margin-left: 3px;
  }

  .game-card-name {
    font-weight: bold;
  }
</style>
