# KOA (v2.x)



> [Koa - next generation web framework for node.js](https://koajs.com/)
>
> [koa - npm](https://www.npmjs.com/package/koa)
>
> [koajs/koa: Expressive middleware for node.js using ES2017 async functions](https://github.com/koajs/koa)



## 定义

- `KOA v2.x+` 是基于 `ES7` 的 `web` 框架, 完全使用 `Promise` 并配合 `async` 来实现异步
  - `Express` 基于 `ES5` , 使用 `回调函数` 来实现异步代码
  - `KOA v1.x+` 基于 `ES6` , 使用 `generator` 实现异步代码
- 由 `Express` 原班人马打造
- 由于语法太新, 兼容性可能不太好
- `KOA` 比较轻量级, 将很多功能封装到了独立的模块中, 若想要使用需要先安装对应的模块

---

## 安装



### 手动安装

- 默认安装 `v2.x` 版本

```shell
npm i koa
```

---

## 基本使用

```js
import Koa from 'koa'

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
```



### 静态资源

- 安装 `koa-static` [koa-static - npm](https://www.npmjs.com/package/koa-static)
- 接收两个参数
  - `root` : 静态资源的路径 (相对路径 / 绝对路径皆可)
  - `options` : 额外配置

```js
import Koa from 'koa'
import serve from 'koa-static'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const app = new Koa()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 静态资源
app.use(serve('public'))

app.listen(3000)
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

错误代码

| Status Code | Constructor Name              |
| ----------- | ----------------------------- |
| 400         | BadRequest                    |
| 401         | Unauthorized                  |
| 402         | PaymentRequired               |
| 403         | Forbidden                     |
| 404         | NotFound                      |
| 405         | MethodNotAllowed              |
| 406         | NotAcceptable                 |
| 407         | ProxyAuthenticationRequired   |
| 408         | RequestTimeout                |
| 409         | Conflict                      |
| 410         | Gone                          |
| 411         | LengthRequired                |
| 412         | PreconditionFailed            |
| 413         | PayloadTooLarge               |
| 414         | URITooLong                    |
| 415         | UnsupportedMediaType          |
| 416         | RangeNotSatisfiable           |
| 417         | ExpectationFailed             |
| 418         | ImATeapot                     |
| 421         | MisdirectedRequest            |
| 422         | UnprocessableEntity           |
| 423         | Locked                        |
| 424         | FailedDependency              |
| 425         | TooEarly                      |
| 426         | UpgradeRequired               |
| 428         | PreconditionRequired          |
| 429         | TooManyRequests               |
| 431         | RequestHeaderFieldsTooLarge   |
| 451         | UnavailableForLegalReasons    |
| 500         | InternalServerError           |
| 501         | NotImplemented                |
| 502         | BadGateway                    |
| 503         | ServiceUnavailable            |
| 504         | GatewayTimeout                |
| 505         | HTTPVersionNotSupported       |
| 506         | VariantAlsoNegotiates         |
| 507         | InsufficientStorage           |
| 508         | LoopDetected                  |
| 509         | BandwidthLimitExceeded        |
| 510         | NotExtended                   |
| 511         | NetworkAuthenticationRequired |

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































































