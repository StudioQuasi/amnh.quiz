import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import vueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//Vue.use(vueVideoPlayer)
