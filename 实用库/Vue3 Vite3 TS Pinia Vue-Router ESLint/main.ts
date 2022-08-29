/* eslint-disable import/order */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import './style.css'


createApp(App).use(createPinia()).use(router).mount('#app')
