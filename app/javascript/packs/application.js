/* eslint no-console: 0 */

import Vue from 'vue'
import Home from '../routes/home.vue'
import GameImporter from '../routes/game_importer.vue'
import Login from '../routes/login.vue'
import SignUp from '../routes/sign_up.vue'

document.addEventListener('DOMContentLoaded', () => {
  const getRoute = (path) => {
    switch (path) {

      case "/":
        return Home

      case "/importer":
        return GameImporter

      case "/login":
        return Login

      case "/sign_up":
        return SignUp

      default:
        throw new Error(`Invalid URL - ${window.location.pathname}`)
    }
  }

  const pathname = window.location.pathname
  new Vue(getRoute(pathname)).$mount("#application")
})
