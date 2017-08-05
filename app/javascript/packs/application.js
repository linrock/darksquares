/* eslint no-console: 0 */

import Vue from 'vue'
import Home from '../routes/home.vue'
import GameImporter from '../routes/game_importer.vue'

document.addEventListener('DOMContentLoaded', () => {
  const getRoute = (path) => {
    switch (path) {

      case "/":
        return Home

      case "/importer":
        return GameImporter

      default:
        throw new Error(`Invalid URL - ${window.location.pathname}`)
    }
  }

  const pathname = window.location.pathname

  if (pathname === "/") {
    new Vue(Home).$mount("#application")
  } else if (pathname === "/importer") {
    new Vue(GameImporter).$mount("#application")
  }
})
