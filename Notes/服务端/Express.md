# Express



> [Express - Node.js web application framework](http://expressjs.com/)
>
> [express - npm](https://www.npmjs.com/package/express)



## 定义

- 一个基于 `NodeJS` 的 `Web Server` 开发框架
- 用于快速搭建 `Web` 服务器
- 可以省去大量繁琐环节, 只需要关注核心业务逻辑
- 永不过时
  - 最早版本是在 `2010` 年发布的, 最新版本是在 `2015` 年发布的, 是一个 `古老` 的框架
  - 公司老项目仍在使用
  - `KOA` / `KOA2` 是 `Express` 原班人马打造的 ( `API` 几乎相同)
  - `EggJS` 是基于 `KOA` 的

---

## 安装



### 手动安装

```shell
npm i express
```

---

## 基本使用

```js
import express from 'express'

const app = express()

app.get('/', (req, res, next) => {
  res.status(200)
  res.set({
    'Content-Type': 'text/plain; charset=utf-8'
  })
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('listening to port 3000')
})
```



### 静态资源

```js
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// 静态资源
app.use(express.static(path.join(__dirname, 'public')))
```



### 动态网页

https://github.com/expressjs/express/blob/master/examples/ejs/index.js

- 若使用 `ejs` , 需要将网页文件后缀名改为 `.ejs` 以方便使用

```js
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// 动态网页
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


app.listen(3000, () => {
  console.log('listening to port 3000')
})
```



### 路由

方式一

- 利用 `get()` / `post()` 方法分别处理 `get` / `post` 请求, 有几个路由就写几个

```js
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
```

方式二

- 使用 `router` 模块
- 会将 `app.use()` 中的 `地址` 和 `router.METHOD()` 中的 `地址` 拼接起来匹配

```js
// user.js
import express from 'express'

const userRouter = express.Router()

userRouter.get('/login', (req, res, next) => {
  res.json({
    name: 'Tony',
    age: 24,
    method: 'get'
  })
})
userRouter.post('/register', (req, res, next) => {
  res.json({
    name: 'Tony',
    age: 24,
    method: 'post'
  })
})

export default userRouter
```

```js
// app.js
// 处理路由
// 2. 方式二: 使用 router 模块
app.use('/api/user', userRouter)

app.listen(3000, () => {
  console.log('listening to port 3000')
})
```



### 请求参数

- `get` 的请求参数会被保存到 `req.query` 中, 并且会被转换成 `对象`
- `post` 的请求参数会保存在 `req.body` 中, 但需要前置操作, 见代码

```js
import express from 'express'

const app = express()

// 请求参数
// get的会被保存在req.query中, 形式是对象
app.get('/get', (req, res, next) => {
  console.log(req.query)
})
// post的会被保存在req.body中, 需要前置操作
app.use(express.json()) // 用于解析 application/json
app.use(express.urlencoded({ extended: true })) // 用于解析 application/x-www-form-urlencoded, false为使用queryString模块解析, true为使用qs模块解析
app.post('/post', (req, res, next) => {
  console.log(req.body)
})


app.listen(3000, () => {
  console.log('listening to port 3000')
})
```



### Cookie

- 获取 `Cookie` 需要安装 `cookie-parser`

```shell
npm i cookie-parser
```

- 获取 `Cookie` 时, 如果 `Cookie` 是签名的, 需要使用 `req.signedCookies`

```js
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

// cookie
// 设置 cookie
app.get('/setCookie', (req, res, next) => {
  res.cookie('username', 'Tony', {
    httpOnly: true,
    path: '/',
    maxAge: 30000
  })
  res.end()
})
// 获取 Cookie
app.use(cookieParser())
app.get('/getCookie', (req, res, next) => {
  console.log(req.cookies)
  res.end()
})

app.listen(3000, () => {
  console.log('listening to port 3000')
})
```

---

## next方法

- 默认情况下处理请求是从上至下匹配路由处理方法, 一旦匹配到了就会执行
- 执行完毕之后如果没有调用 `next()` , 就停止匹配剩下的
- 执行完毕之后如果调用了 `next()` , 就继续向下匹配
  - 包括同一个路由地址的回调函数
  - 可以把一个路由地址请求的业务逻辑放到不同的回调函数中处理

```js
// 不同路由地址
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
// 同一个路由地址
app.get('/api/user/info', (req, res, next) => {
  console.log('验证是否登录')
  next()
}, (req, res, next) => {
  console.log('已经登陆, 可以查看信息')
})
```

---

## 错误处理

[Express error handling](http://expressjs.com/en/guide/error-handling.html)

- 一般将没有路由地址的 `use()` 放到最后来处理错误请求

[http-errors - npm](https://www.npmjs.com/package/http-errors)

- 借助第三方库 `http-errors` 完成创建错误对象的操作

```js
import express from 'express'
import createError from 'http-errors'

const app = express()

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
```

---

## 中间件

[Using Express middleware](http://expressjs.com/en/guide/using-middleware.html#using-middleware)

- 本质是一个特殊的 `函数`
- 接收 `req` / `res` / `next` 三个参数
- 在 `Express` 中, 只要是接收这三个参数的函数都是 `中间件`
- 作用是将一个请求的处理过程分发到多个环节中
  - 效率高, 便于维护
  - 每个环节专门干一件事

```js
(req, res, next) => { /* ... */ }
```



### 分类

应用级别

- 绑定到 `app` 实例上的中间件
- `app.get` / `app.post` 等

路由级别

- 绑定到 `router` 实例上的中间件
- `router.get` / `router.post` 等

错误处理

- 多了一个 `err` 参数

```js
(err, req, res, next) => { /* ... */ }
```

内置中间件

- `express.static()` 
- `express.json()` 
- `express.urlencoded()` 
- ......

第三方中间件

- `cookie-parser`
- ......



### express-session

https://www.npmjs.com/package/express-session

- 一个 `Session` 中间件
- 可以用来存储登录状态
- 会存储在 `req.session` 中
- 如果使用 `Redis` , 可以配合 `connect-redis` 使用 [connect-redis - npm](https://www.npmjs.com/package/connect-redis)



### morgan

[morgan - npm](https://www.npmjs.com/package/morgan)

- 用于处理日志

























