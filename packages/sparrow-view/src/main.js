import Vue from 'vue'
import App from './App.vue'
import router from './router'
import box from '@sparrow/box'

Vue.config.productionTip = false
console.log(box);
Vue.use(box)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
