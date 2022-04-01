import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from '../stores'
import type { PrivilegeNode } from '../types'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'


/**
 * Global configs
 */
axios.defaults.baseURL = 'http://127.0.0.1:7001'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true // cookie


/**
 * Interceptor
 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const mainStore = useStore()

  // privilege control
  if (!_allow(config.url, config.method?.toLowerCase(), mainStore.currentUser?.privilegeTree?.find(privilege => privilege.type === 'request'))) {
    const controller = new AbortController()
    config.signal = controller.signal
    controller.abort(`No privilege to send request to "${ config.url ?? 'undefined' }"`)

    ElMessage.error({
      message: `You are not allowed to send request to "${ config.url ?? 'undefined' }"`,
      center: true,
      showClose: true,
      duration: 3000
    })
  }

  if (config.headers) {
    config.headers.Authorization = localStorage.getItem('token') ?? '' // JWT Token
  }
  return config
}, async err => Promise.reject(err))

axios.interceptors.response.use((config: AxiosResponse) => config, async err => Promise.reject(err))


/**
 * GET
 */
export const get = async (path = '', data = {}): Promise<AxiosResponse> => axios.get(path, {
  params: data
})


/**
 * POST
 */
export const post = async (path = '', data = {}): Promise<AxiosResponse> => axios.post(path, data)


/**
 * DELETE
 * @param {string} path
 * @param {{}} data
 * @return {Promise<AxiosResponse>}
 */
export const deleteRequest = async (path = '', data = {}): Promise<AxiosResponse> => axios.delete(path, {
  params: data
})


/**
 * PUT
 * @param {string} path
 * @param {{}} data
 * @return {Promise<AxiosResponse>}
 */
export const put = async (path = '', data = {}): Promise<AxiosResponse> => axios.put(path, data)


/**
 * ALL
 */
export const all = async (requests: Iterable<Promise<AxiosResponse>>): Promise<Awaited<AxiosResponse>[]> => Promise.all(requests)


export const getFile = async (path = '', data = {}): Promise<AxiosResponse> => axios.get(path, {
  params: data,
  responseType: 'blob'
})


/**
 * Privilege Control
 */
const allowedPaths = ['/register', '/login', '/verify-email', '/is-logged-in', '/api/v1/users/', '/api/v1/export-all-users']

const _allow = (path: string | undefined, method: string | undefined, requestPrivilege: PrivilegeNode | undefined): boolean => {
  if (!path) return false

  if (allowedPaths.some(p => path.includes(p))) return true

  if (!requestPrivilege) return false

  if (
    requestPrivilege.privilegeUrl &&
    path.includes(requestPrivilege.privilegeUrl) &&
    requestPrivilege.requestMethod === method
  ) return true

  if (requestPrivilege.children) {
    for (const p of requestPrivilege.children) {
      if (_allow(path, method, p)) return true
    }
  }

  return false
}
