import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '/src/assets/iconfont/iconfont.js'
import '/src/assets/iconfont/iconfont.css'
import 'element-plus/es/components/message/style/css'


createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
