/* eslint no-console: 0 */

import Vue from 'vue'
import Home from '../routes/home.vue'
import GameImporter from '../routes/game_importer.vue'
import Login from '../routes/login.vue'

document.addEventListener('DOMContentLoaded', () => {
  const getRoute = (path) => {
    switch (path) {

      case "/":
        return Home

      case "/importer":
        return GameImporter

      case "/login":
        return Login

      default:
        throw new Error(`Invalid URL - ${window.location.pathname}`)
    }
  }

  const pathname = window.location.pathname

  if (pathname === "/") {
    new Vue(Home).$mount("#application")
  } else if (pathname === "/importer") {
    new Vue(GameImporter).$mount("#application")
  } else if (pathname === "/login") {
    new Vue(Login).$mount("#application")
  }
})
