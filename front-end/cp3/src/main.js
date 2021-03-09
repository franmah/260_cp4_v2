import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'

Vue.config.productionTip = false


let data = {
  universities: [],
}

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')
