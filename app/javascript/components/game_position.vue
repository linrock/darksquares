<template>
  <div class="game-position">
    <div class="move-name">{{ move }}</div>
  </div>
</template>

<script>
  import { state } from '../store/miniboard'

  export default {
    data: function() {
      return {
        globalState: state
      }
    },
    computed: {
      move: function() {
        return this.globalState.move
      }
    }
  }
</script>

<style lang="scss" scoped>
  .move-name {
    font-size: 16px;
    font-weight: bold;
    height: 18px;
  }
</style>
