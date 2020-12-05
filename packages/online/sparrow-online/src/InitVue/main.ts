export default {
  '/src/main.js': 
    {
      code: `
      import Vue from 'vue'
import App from './App.vue'
import router from './router'
import box, { Event } from '@sparrow-vue/boxs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/base.scss';
import message from './utils/message';
import Pagination from './components/Pagination';
import CountTo from 'vue-count-to';
// import './icons' // icon
Vue.component('Pagination', Pagination);
Vue.component('CountTo', CountTo);
Event.on('pivot_operate', (data) => {
  console.log('pivot_operate', data);
  message.emit(data.handler, data);
});

Vue.config.productionTip = false
Vue.use(box)
Vue.use(ElementUI);

window.addEventListener("message", (event) => {
}, false);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
window.parent.postMessage('asdhasjdjkasd', '*');
// document.domain = 'localhost';
      `
    }    
  
}