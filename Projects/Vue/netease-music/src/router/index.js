import Vue from 'vue'
import VueRouter from 'vue-router'

// 异步导入
const HomeRecommend = () => import('../views/HomeRecommend.vue')
const HomeArtists = () => import('../views/HomeArtists.vue')
const HomeRanking = () => import('../views/HomeRanking.vue')
const HomeSearch = () => import('../views/HomeSearch.vue')
const ListDetail = () => import('../views/ListDetail.vue')
const PersonalAccount = () => import('../views/PersonalAccount.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend', component: HomeRecommend },
  { path: '/artists', component: HomeArtists },
  { path: '/rank', component: HomeRanking },
  { path: '/search', component: HomeSearch },
  { path: '/listDetail/:type/:id', component: ListDetail },
  { path: '/account', component: PersonalAccount }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
