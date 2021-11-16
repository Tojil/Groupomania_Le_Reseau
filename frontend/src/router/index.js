import Vue from 'vue'
import VueRouter from 'vue-router'
const Auth = () => import(/* webpackChunkName: "auth" */ '../components/Auth');
const Accueil = () => import(/* webpackChunkName: "accueil" */ '../components/Accueil');
const Profil = () => import(/* webpackChunkName: "profil" */ '../components/Hall/Profil');
const Forum = () => import(/* webpackChunkName: "forum" */ '../components/Hall/Forum');
const Post = () => import(/* webpackChunkName: "formpost" */ '../components/Hall/FormPost');
const Moderation = () => import(/* webpackChunkName: "moderation" */ '../components/Hall/Moderation');



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
    path: '/hall/profil',
    name: 'profil',
    component: Profil
  },
  {
    path: '/hall/forum',
    name: 'forum',
    component: Forum
  },
  {
    path:'/hall/forum/post',
    name: 'post',
    component: Post
  },
  {
    path: '/hall/moderation',
    name: 'moderation',
    component: Moderation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
