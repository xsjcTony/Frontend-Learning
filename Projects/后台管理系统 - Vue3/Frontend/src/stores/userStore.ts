import { defineStore } from 'pinia'
import { UserStore } from '../types'


export const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      tableData: [],
      queryData: {
        role: '',
        origin: '',
        type: '',
        keyword: '',
        currentPageNumber: 1,
        pageSize: parseInt(sessionStorage.getItem('userTablePageSize') ?? '10') || 10
      },
      totalUserCounts: 0
    }
  }
})
