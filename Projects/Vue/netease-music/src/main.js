import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
import VueLazyLoad from 'vue-lazyload'
// import VConsole from 'vconsole'
import Loading from './plugin/loading'
import MetaInfo from 'vue-meta-info'

Vue.use(VueLazyLoad, {
  loading: require('./assets/images/loading.png') // 图片正在加载的placeholder图片
})

Vue.use(Loading)

Vue.use(MetaInfo)

Vue.config.productionTip = false

// const vConsole = new VConsole()
// Vue.use(vConsole)

new Vue({
  router,
  store,
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
  render: h => h(App)
}).$mount('#app')
