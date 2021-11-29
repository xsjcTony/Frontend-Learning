import axios from 'axios'
import Vue from 'vue'

// 全局配置
axios.defaults.baseURL = 'http://192.168.1.2:3000'
axios.defaults.timeout = 5000

// 拦截器 (interceptor)
let requestCount = 0

axios.interceptors.request.use((config) => {
  requestCount++
  Vue.toggleLoading(true)
  return config
}, (err) => {
  Vue.toggleLoading(false)
  return Promise.reject(err)
})

axios.interceptors.response.use((config) => {
  if (--requestCount === 0) {
    Vue.toggleLoading(false)
  }
  return config
}, (err) => {
  Vue.toggleLoading(false)
  return Promise.reject(err)
})

// 封装 get / post
export default {
  get (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then((response) => { resolve(response.data) })
        .catch((err) => { reject(err) })
    })
  },

  post (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(path, data)
        .then((response) => { resolve(response.data) })
        .catch((err) => { reject(err) })
    })
  },

  all (requests) {
    return new Promise((resolve, reject) => {
      Promise.all(requests)
        .then((res) => { resolve(res) })
        .catch((err) => { reject(err) })
    })
  }
}
