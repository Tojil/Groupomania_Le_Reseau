import Vue from 'vue'
import VueRouter from 'vue-router'
const Auth = () => import(/* webpackChunkName: "auth" */ '../components/Auth');
const Accueil = () => import(/* webpackChunkName: "accueil" */ '../components/Accueil');
const Profil = () => import(/* webpackChunkName: "profil" */ '../components/Hall/Profil');
const Post = () => import(/* webpackChunkName: "formpost" */ '../components/Hall/FormPost');



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
    path: '/accueil/profil',
    name: 'profil',
    component: Profil
  },
  {
    path:'/hall/forum/post',
    name: 'post',
    component: Post
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
