import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'video.js/dist/video-js.css'
import 'video.js/dist/video.min.js'
import { vueBaberrage } from 'vue-baberrage'
Vue.use(vueBaberrage)
Vue.prototype.$axios=axios
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

