import VueRouter from 'vue-router'

import Home from './routes/home.vue'
import GameImporter from './routes/game_importer.vue'
import GameSubmitter from './routes/game_submitter.vue'
import About from './routes/about.vue'
import Login from './routes/login.vue'
import SignUp from './routes/sign_up.vue'
import Game from './routes/game.vue'
import UserSettings from './routes/user_settings.vue'

import UserLayout from './layouts/user_layout.vue'
import UserProfile from './routes/user_profile.vue'
import UserGames from './routes/user_games.vue'
import UserAnnotations from './routes/user_annotations.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/import',
    component: GameImporter
  },
  {
    path: '/submit',
    component: GameSubmitter
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
    path: '/about',
    component: About,
  },
  {
    path: '/g/:id',
    component: Game,
    props: true
  },
  {
    path: '/u/:username',
    component: UserLayout,
    props: true,
    children: [
      {
        path: '',
        component: UserProfile,
      },
      {
        path: 'games',
        component: UserGames,
      },
      {
        path: 'annotations',
        component: UserAnnotations,
      }
    ]
  },
  {
    path: '/settings',
    component: UserSettings,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.afterEach((to, from) => {
  if (window.ga) {
    ga('send', 'pageview', to.path)
  }
})

export default router
