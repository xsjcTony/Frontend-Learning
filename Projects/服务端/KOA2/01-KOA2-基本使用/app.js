import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { Buffer } from 'node:buffer'

import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import onerror from 'koa-onerror'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = new Koa()
const router = new Router()

onerror(app) // 捕获所有 app 实例的错误

// app.use(bodyParser())
app.use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)


// 静态资源
/*
app.use(serve('public'))
*/


// 动态资源
/*
app.use(views('views', {
  map: {
    html: 'ejs'
  }
}))
app.use(async (ctx, next) => {
  await ctx.render('index', { // 指定渲染 index.html 文件
    msg: 'Tony loves Lily.'
  })
})
*/


// 路由
/*
router.get('/api/goods/list', (ctx, next) => {
  ctx.body = 'get /api/goods/list'
})
router.get('/api/user/login', (ctx, next) => {
  ctx.body = {
    method: 'get',
    name: 'Tony',
    age: 24
  }
})
router.post('/api/goods/detail', (ctx, next) => {
  ctx.body = 'post /api/goods/detail'
})
router.post('/api/user/register', (ctx, next) => {
  ctx.body = {
    method: 'post',
    name: 'Lily',
    age: 25
  }
})
app.use(router.routes()) // 启动路由功能
  .use(router.allowedMethods()) // 自动设置响应头
*/


// 请求参数
/*
// get 请求
// 传统形式
router.get('/user', (ctx, next) => {
  console.log(ctx.request.query) // 转换成对象之后的
  console.log(ctx.request.querystring) // 转换成对象之前的
  ctx.body = ''
})
// 动态路由形式
router.get('/login/:name/:age', (ctx, next) => {
  console.log(ctx.params)
  ctx.body = ''
})

// post 请求
router.post('/user', (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = ''
})
*/


// Cookie
/*
router.get('/setCookie', (ctx, next) => {
  const value = Buffer.from('阿巴阿巴').toString('base64') // 存储中文的方法
  ctx.cookies.set('name', value, { // 设置 cookie
    path: '/',
    httpOnly: true,
    maxAge: 30000 // ms
  })

  ctx.body = ''
})
router.get('/getCookie', (ctx, next) => {
  const value = ctx.cookies.get('name')
  if (value) {
    console.log(Buffer.from(value, 'base64').toString()) // 获取cookie, 并转换成中文
  }

  ctx.body = ''
})
*/


// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
