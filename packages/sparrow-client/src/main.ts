import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {receiveMessage} from './util/messageBridge'

Vue.config.productionTip = false;
receiveMessage();
Vue.use(Element);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
