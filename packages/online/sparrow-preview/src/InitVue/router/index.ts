
export default {
  '/src/router/index.js': 
    {
      code: `
      import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router

      `
    }    
  
}