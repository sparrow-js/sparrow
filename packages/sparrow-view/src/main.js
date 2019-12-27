import Vue from 'vue'
import App from './App.vue'
import router from './router'
import box from '@sparrow/box'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/base.scss';
import message from './utils/message';

Vue.config.productionTip = false
Vue.use(box)
Vue.use(ElementUI);
message.emit('generator.data.getBoxList')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
