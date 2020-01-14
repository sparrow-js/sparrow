import Vue from 'vue'
import App from './App.vue'
import router from './router'
import box, { Event } from '@sparrow-vue/boxs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/base.scss';
import message from './utils/message';

Event.on('pivot_operate', (data) => {
  console.log('pivot_operate', data);
  message.emit(data.handler, data);
})


Vue.config.productionTip = false
Vue.use(box)
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
