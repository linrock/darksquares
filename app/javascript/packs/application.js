/* eslint no-console: 0 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import Application from '../layouts/application.vue'

import Home from '../routes/home.vue'
import GameImporter from '../routes/game_importer.vue'
import Login from '../routes/login.vue'
import SignUp from '../routes/sign_up.vue'
import Games from '../routes/games.vue'
import Annotations from '../routes/annotations.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/importer',
    component: GameImporter
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/sign_up',
    component: SignUp
  },
  {
    path: '/games',
    component: Games
  },
  {
    path: '/annotations',
    component: Annotations
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#application",
    router,
    render: h => h(Application)
  })
})
