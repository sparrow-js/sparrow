import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import box from '../src/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.use(VueRouter);
Vue.use(box, {});

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
    mode: 'history',
    routes: [
        {
            path: '/box',
            component: (resolve) => require(['./routers/box.vue'], resolve)
        },
        {
            path: '/view',
            component: (resolve) => require(['./routers/view.vue'], resolve)
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
