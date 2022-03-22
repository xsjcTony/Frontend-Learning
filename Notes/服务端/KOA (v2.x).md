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
- 理论上, 所有 `中间件` 都是 `async` 异步的

---

## 安装



### 手动安装

- 默认安装 `v2.x` 版本

```shell
npm i koa
```

---

## 基本使用

- `KOA` 中的 `ctx` 就是 `Express` 中 `req` 和 `res` 的结合体
  - `ctx.request` 可以拿到 `req` 对象
  - `ctx.response` 可以拿到 `res` 对象
- `ctx.body` 相当于 `res.writeHead()` + `res.end()`
- 所有 `中间件` 都是 `async` 异步的
- 调用 `next()` 时需要使用 `await`

```js
import Koa from 'koa'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
```



### 静态资源

- 安装 `koa-static` [koa-static - npm](https://www.npmjs.com/package/koa-static)

```shell
npm i koa-static
```

- 接收两个参数
  - `root` : 静态资源的路径 (相对路径 / 绝对路径皆可)
  - `options` : 额外配置

```js
import Koa from 'koa'
import serve from 'koa-static'

const app = new Koa()

// 静态资源
app.use(serve('public'))

app.listen(3000)
```



### 动态网页

- 安装 `koa-views` [koa-views - npm](https://www.npmjs.com/package/koa-views)

```shell
npm i koa-views
```

- 若使用 `ejs` , 需要将网页文件后缀名改为 `.ejs` 以方便使用

```js
import Koa from 'koa'
import views from 'koa-views'

const app = new Koa()

// 动态资源
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

app.listen(3000)
```



### 路由

- 安装 `@koa/router` [koa-router - npm](https://www.npmjs.com/package/koa-router)
  - `API` : [router/API.md at master · koajs/router](https://github.com/koajs/router/blob/master/API.md)

```shell
npm i @koa/router
```

```js
import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

// 路由
router.prefix ('/api') // 匹配时会将这个作为前缀拼接

router.get('/goods/list', (ctx, next) => {
  ctx.body = 'get /api/goods/list'
})
router.get('/user/login', (ctx, next) => {
  ctx.body = {
    method: 'get',
    name: 'Tony',
    age: 24
  }
})
router.post('/goods/detail', (ctx, next) => {
  ctx.body = 'post /api/goods/detail'
})
router.post('/user/register', (ctx, next) => {
  ctx.body = {
    method: 'post',
    name: 'Lily',
    age: 25
  }
})
app.use(router.routes()) // 启动路由功能
  .use(router.allowedMethods()) // 自动设置响应头


app.listen(3000)
```



### 请求参数

#### get

- `get` 请求参数分为两种

  - 传统形式

  ```js
  router.get('/user', (ctx, next) => {
    console.log(ctx.request.query) // 转换成对象之后的
    console.log(ctx.request.querystring) // 转换成对象之前的
    ctx.body = ''
  })
  ```

  - 动态路由形式

  ```js
  router.get('/login/:name/:age', (ctx, next) => {
    console.log(ctx.params)
    ctx.body = ''
  })
  ```

#### post

- 安装 `koa-bodyparser` [koa-bodyparser - npm](https://www.npmjs.com/package/koa-bodyparser)
  - 请求参数作为 `对象` 存储在 `ctx.request.body` 中

```js
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()

// 请求参数
// post 请求
router.post('/user', (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = ''
})

app.use(bodyParser())

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
```



### Cookie

- 直接使用 `ctx.cookies` 对 `Cookie` 进行操作
  - 不能设置 `中文` 的值, 除非使用 `Buffer` 转换成 `base64`


```js
import { Buffer } from 'node:buffer'

import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

// Cookie
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

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
```



### 返回文件

- 使用 `Content-Type` 指定 `mime` 类型
- 使用 `ctx.attachment(filename?)` 指定需要下载以及可选 `文件名`

```js
ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') // xlsx
ctx.attachment('users.xls') // 下载文件名
```



---

## next方法

- 同 `Express` 的 `next()` 方法
- 但是是 `异步` 的, 需要调用 `await` 来等待完成

---

## 错误处理

- 安装 `koa-onerror` [koa-onerror - npm](https://www.npmjs.com/package/koa-onerror)

```js
import Koa from 'koa'
import Router from '@koa/router'
import onerror from 'koa-onerror'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = new Koa()
const router = new Router()

onerror(app) // 捕获所有 app 实例的错误

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
```

---

## 保存登录状态

- `koa-generic-session` [koa-generic-session - npm](https://www.npmjs.com/package/koa-generic-session)
- `koa-redis` [koa-redis - npm](https://www.npmjs.com/package/koa-redis#options)

---

## 日志记录

控制台输出

- 使用 `koa-logger` [koa-logger - npm](https://www.npmjs.com/package/koa-logger)

写入到文件

- 使用 `koa-morgan` [koa-morgan - npm](https://www.npmjs.com/package/koa-morgan)

注意点 

- <span style="color: #ff0;">一定要放在任何 `静态资源` / `路由` / `动态网页` 之前</span>

---

## 使用TypeScript

- 安装相关依赖

```shell
npm i -D typescript ts-node @types/node @types/koa cross-env nodemon
```

- 配置 `package.json`

```json
"dev": "cross-env NODE_ENV=develop nodemon --exec ts-node app.ts"
```





















































