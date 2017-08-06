import Vue from 'vue'
import VueRouter from 'vue-router'

import Application from '../layouts/application.vue'
import router from '../router'

Vue.use(VueRouter)

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#application",
    router,
    render: h => h(Application)
  })
})
