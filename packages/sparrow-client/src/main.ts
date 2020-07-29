import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { receiveMessage } from './util/messageBridge';
import { library } from '@fortawesome/fontawesome-svg-core';
import './assets/icon/iconfont.css';
import {
  faCode,
  faEye,
  faFileExport,
  faTrashRestoreAlt,
  faFile,
  faTree,
  faFileArchive
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import codeMirrorInstall from './codemirror';
codeMirrorInstall(Vue);

library.add(faCode);
library.add(faEye);
library.add(faFileExport);
library.add(faTrashRestoreAlt);
library.add(faFile);
library.add(faTree);
library.add(faFileArchive);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
receiveMessage();
Vue.use(Element);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
document.domain = 'localhost';
Vue.prototype.$EventBus = new Vue();
