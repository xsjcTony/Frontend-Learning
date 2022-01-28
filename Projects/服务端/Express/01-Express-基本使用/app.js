import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import userRouter from './router/user.js'
import goodsRouter from './router/goods.js'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()


// 静态资源
/*
app.use(express.static(path.join(__dirname, 'public')))
*/


// 动态网页
/*
// 1. 动态资源路径
app.set('views', path.join(__dirname, 'views'))
// 2. 确定模板引擎
app.set('view engine', 'ejs')
// 3. 监听请求, 返回渲染之后的动态网页
app.get('/', (req, res, next) => {
  res.render('index', {
    msg: 'Tony loves Lily.'
  })
})
*/


// 处理路由
// 1. 方式一: 利用 get() / post() , 有几个路由写几个
/*
app.get('/api/goods/list', (req, res, next) => {
  res.end('Aelita.list.get')
})
app.get('/api/user/login', (req, res, next) => {
  res.json({
    name: 'Tony',
    age: 24,
    method: 'get'
  })
})
app.post('/api/goods/detail', (req, res, next) => {
  res.end('Aelita.detail.post')
})
app.post('/api/user/register', (req, res, next) => {
  res.json({
    name: 'Tony',
    age: 24,
    method: 'post'
  })
})
*/
// 2. 方式二: 使用 router 模块
/*
app.use('/api/user', userRouter)
app.use('/api/goods', goodsRouter)
*/


// 请求参数
// get的会被保存在req.query中, 形式是对象
/*
app.get('/get', (req, res, next) => {
  console.log('GET - req.query: ', req.query)
  res.end()
})
*/
// post的会被保存在req.body中, 需要前置操作
/*
app.use(express.json()) // 用于解析 application/json
app.use(express.urlencoded({ extended: true })) // 用于解析 application/x-www-form-urlencoded, false为使用queryString模块解析, true为使用qs模块解析
app.post('/post', (req, res, next) => {
  console.log('POST - req.body: ', req.body)
  res.end()
})
*/


// cookie
// 设置 cookie
/*
app.get('/setCookie', (req, res, next) => {
  res.cookie('username', 'Tony', {
    httpOnly: true,
    path: '/',
    maxAge: 30000
  })
  res.end()
})
*/
// 获取 Cookie
/*
app.use(cookieParser())
app.get('/getCookie', (req, res, next) => {
  console.log(req.cookies)
  res.end()
})
*/


// next 方法
/*
app.use((req, res, next) => {
  console.log('use1 没有路由地址')
  next()
})
app.use('/', (req, res, next) => {
  console.log('use2 有路由地址')
  next()
})
app.get('/api', (req, res, next) => {
  console.log('get1 /api')
  next()
})
app.get('/api/user', (req, res, next) => {
  console.log('get2 /api/user')
  next()
})
app.post('/api', (req, res, next) => {
  console.log('post1 /api')
  next()
})
app.post('/api/user', (req, res, next) => {
  console.log('post2 /api/user')
  next()
})

app.get('/api/user/info', (req, res, next) => {
  console.log('验证是否登录')
  next()
}, (req, res, next) => {
  console.log('已经登陆, 可以查看信息')
})
*/


// 错误处理
app.get('/api/user/login', (req, res, next) => {
  res.end('login')
})
app.get('/api/user/register', (req, res, next) => {
  res.end('register')
})
app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  console.log(err.status, err.message)
  res.end(err.message)
})




app.listen(3000, () => {
  console.log('listening to port 3000')
})
