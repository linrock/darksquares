import VueRouter from 'vue-router'

import Home from './routes/home.vue'
import GameImporter from './routes/game_importer.vue'
import Login from './routes/login.vue'
import SignUp from './routes/sign_up.vue'
import Game from './routes/game.vue'
import Games from './routes/games.vue'
import Annotations from './routes/annotations.vue'
import UserProfile from './routes/user_profile.vue'

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
    path: '/games/:id',
    component: Game,
    props: true
  },
  {
    path: '/games',
    component: Games
  },
  {
    path: '/annotations',
    component: Annotations
  },
  {
    path: '/profile',
    component: UserProfile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
