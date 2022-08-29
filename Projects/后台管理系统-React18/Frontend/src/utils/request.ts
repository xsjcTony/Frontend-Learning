import { extend } from 'umi-request'
import store from '@/store'


const request = extend({
  credentials: 'include', // cross-origin Cookie
  prefix: store.getState().layout.apiBaseUrl,
  timeout: 10000,
  headers: { Authorization: localStorage.getItem('token') ?? '' }
})


// Interceptor
request.interceptors.request.use((url, options) => {
  return {
    options: {
      ...options,
      headers: {
        ...options.headers,
        Authorization: localStorage.getItem('token') ?? ''
      }
    }
  }

  // TODO: 处理 request privilege
})


export const get = async <T = any>(url: string, data = {}): Promise<T> => request.get<T>(url, {
  params: data
})

export const post = async <T = any>(url: string, data = {}): Promise<T> => request.post<T>(url, { data })

export const deleteRequest = async <T = any>(url: string, data = {}): Promise<T> => request.delete<T>(url, {
  params: data
})

export const put = async <T = any>(url: string, data = {}): Promise<T> => request.put<T>(url, { data })

export const all = async <T = any>(requests: Iterable<Promise<T>>): Promise<Awaited<T>[]> => Promise.all(requests)

export const getFile = async <T = any>(path: string, data = {}): Promise<T> => request.get<T>(path, {
  params: data,
  responseType: 'blob'
})
