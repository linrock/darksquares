/* eslint no-console: 0 */

import Vue from 'vue'
import Home from '../routes/home.vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue(Home).$mount('#application')
})
