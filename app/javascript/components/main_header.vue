<template>
  <div class="main-header">
    <header class="main">
      <div class="left"><a href="/">Dark Squares</a></div>

      <div class="right">
        <a href="/importer">Import game</a>
        <a href="/games">Games</a>
        <a href="/annotations">Annotations</a>
      </div>
    </header>

    <div class="header-spacer"></div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .main {
    background: #333;
    color: white;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 35px;
    position: fixed;
    display: flex;
    z-index: 1;

    a {
      color: inherit;
      text-decoration: none;
    }

    .left {
      width: 415px;
    }

    .right {
      a {
        color: rgba(255,255,255,0.6);
        margin-right: 30px;
      }
    }
  }

  .header-spacer {
    height: 40px;
  }
</style>
