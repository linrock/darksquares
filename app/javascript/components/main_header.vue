<template>
  <div class="main-header">
    <header class="main">
      <div class="square"></div>

      <div class="left">
        <router-link to="/">Dark Squares</router-link>
      </div>

      <div class="right">
        <router-link to="/importer">Import game</router-link>
        <router-link to="/games">Games</router-link>
        <router-link to="/annotations">Annotations</router-link>
      </div>

      <div class="far-right">
        <router-link :to="userPath">{{ userLinkText }}</router-link>
      </div>
    </header>

    <div class="header-spacer"></div>
  </div>
</template>

<script>
  import { getUsername } from '../store/local_storage'

  export default {
    data: function() {
      return {
        username: getUsername()
      }
    },
    computed: {
      userPath: function() {
        return this.username ? "/profile" : "/login"
      },
      userLinkText: function() {
        return this.username ? this.username : "Log in"
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-header {

  }
  .main {
    background: #333;
    color: white;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    display: flex;
    z-index: 1;

    a {
      color: inherit;
      text-decoration: none;
    }

    .square {
      width: 40px;
      height: 40px;
      background: #222;
    }

    .left {
      width: 415px;
      margin-left: 40px;
    }

    .right {
      a {
        color: rgba(255,255,255,0.6);
        margin-right: 30px;
      }
    }

    .far-right {

    }
  }

  .header-spacer {
    height: 40px;
  }
</style>
