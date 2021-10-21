import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import { NavbarPlugin } from 'bootstrap-vue'
import axios from 'axios'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(NavbarPlugin)
Vue.prototype.$http = axios;
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* new Vue({
  render: h => h(App),
}).$use(router)
.$mount('#app') */

new Vue ({
  el: '#app',
  router,
  render: h => h(App),
})