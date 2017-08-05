/* eslint no-console: 0 */

import Vue from 'vue'
import App from '../components/app.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue(App).$mount('#application')

  console.log(app)
})
