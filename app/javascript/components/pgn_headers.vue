<template>
  <div class="pgn-info">
    <div class="pgn-header" v-for="(value, header) in pgnHeaders" v-if="validValue(value)">
      <div class="header">{{ header }}</div>
      <div class="value">{{ value }}</div>
    </div>
  </div>
</template>

<script>
  import Chess from 'chess.js'
  import { state } from '../store/miniboard'

  export default {
    data: function() {
      return {
        globalState: state,
      }
    },
    computed: {
      pgnHeaders: function() {
        return this.globalState.pgnHeaders
      }
    },
    methods: {
      validValue(value) {
        return value !== '?'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pgn-header {
    font-size: 14px;
    line-height: 18px;
    margin-top: 30px;
  }

  .header {
    float: left;
    font-weight: bold;
    width: 120px;
  }

  .value {
    float: left;
    width: 190px; 
  }
</style>
