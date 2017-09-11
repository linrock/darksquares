import Vue from 'vue'
import VueRouter from 'vue-router'

import Application from '../layouts/application.vue'
import router from '../router'
import store from '../store'

Vue.use(VueRouter)

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#application",
    store,
    router,
    render: h => h(Application)
  })
})
