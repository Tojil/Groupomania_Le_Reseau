import Vue from 'vue'
import VueRouter from 'vue-router'
const Auth = () => import(/* webpackChunkName: "auth" */ '../components/Auth');
// import Login from '../components/Auth/Login';
// import Signup from '../components/Auth/Signup';
const Accueil = () => import(/* webpackChunkName: "accueil" */ '../components/Accueil');
const Profil = () => import(/* webpackChunkName: "profil" */ '../components/Hall/Profil');



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: Auth
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: Accueil
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
