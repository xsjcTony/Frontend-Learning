import { defineStore } from 'pinia'
import { MainStore } from '../types'


export const useStore = defineStore('main', {
  state: (): MainStore => {
    return {
      loggedIn: false,
      currentUser: null,
      assetBaseUrl: 'http://127.0.0.7:7001',
      apiBaseUrl: 'http://127.0.0.7:7001'
    }
  }
})
