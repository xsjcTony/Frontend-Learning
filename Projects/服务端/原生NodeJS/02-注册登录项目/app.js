// 服务端业务逻辑核心
// 处理各种请求
import { URL, URLSearchParams, fileURLToPath } from 'url'
import { goodsRouterHandler } from './router/goods.js'
import { userRouterHandler } from './router/user.js'
import * as staticServer from './utils/staticServer.js'
import path from 'path'
import { cookieToObject, generateCookieExpires } from './utils/utils.js'
import redis from './database/redis.js'
import writeLog from './utils/log.js'


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootPath = path.join(__dirname, 'public')


// helper functions
/**
 * Initialize cookie and session, store user's login status in `req.session`
 * @param req
 * @param res
 * @private
 */
const _initCookieAndSession = async (req, res) => {
  // Cookie
  req.cookie = cookieToObject(req.headers.cookie)

  // 用户标识
  req.userId = req.cookie.userId

  if (!req.userId) {
    req.userId = `${ Date.now() }_${ Math.random() }_Aelita`

    res.setHeader('Set-Cookie', `userId=${ req.userId }; path=/; httpOnly; expires=${ generateCookieExpires(24) }`)

    req.session = {}
  }

  req.session = req.session ?? await redis.get(req.userId) ?? {}
}


/**
 * Initialize required IncomingMessage parameters
 * @param req
 * @param res
 * @return {Promise<unknown>}
 * @private
 */
const _initParams = async (req, res) => {
  // 准备: 请求方式, 请求路径, 请求参数

  // 请求方式
  req.method = req.method.toLowerCase()

  // 请求路径
  const reqUrl = new URL(req.url, 'http://127.0.0.1:3000/')
  req.path = reqUrl.pathname

  // cookie & session
  await _initCookieAndSession(req, res)

  // 请求参数
  return new Promise((resolve, reject) => {
    if (req.method === 'get') {
      req.query = reqUrl.searchParams
      resolve()
    } else if (req.method === 'post') {
      let params = ''
      req.on('data', (chunk) => {
        params += chunk
      })
      req.on('end', () => {
        req.body = new URLSearchParams(params)
        resolve()
      })
    }
  })
}


const _resSetEndJSON = (res, data) => {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  })
  res.end(JSON.stringify(data))
}


// public functions
export const serverHandler = async (req, res) => {
  // 写入日志
  writeLog(`${ new Date().toTimeString() }   ${ req.method }   ${ req.url }   ${ req.headers['user-agent'] }`)

  // 返回静态网页
  const staticPage = await staticServer.readFile(req, res, rootPath)
  if (staticPage) { return }


  // 处理各种请求需要知道
  /*
  - 请求方式
  - 请求路径
  - 请求参数
  */
  await _initParams(req, res)


  // 处理商品路由
  const goodsData = await goodsRouterHandler(req, res)
  if (goodsData) {
    _resSetEndJSON(res, goodsData)
    return
  }

  // 处理用户路由
  const userData = await userRouterHandler(req, res)
  if (userData) {
    _resSetEndJSON(res, userData)
    return
  }

  // 没有找到路由
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
  res.end('404 Not Found')


}
