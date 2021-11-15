import Vue from 'vue'
import VueRouter from 'vue-router'
import { signup } from '../../../backend/controllers/user'
import Auth from '../components/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: Auth
  },
  {
    path: '../components/Auth/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Auth')
  }
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
