# EggJS (v2.x)



> [egg - 为企业级框架和应用而生](https://eggjs.org/zh-cn/)
>
> [egg - npm](https://www.npmjs.com/package/egg)
>
> [eggjs/egg: 🥚 Born to build better enterprise frameworks and apps with Node.js &amp; Koa](https://github.com/eggjs/egg)



## 定义

- `阿里巴巴` 基于 `KOA` 的<span style="color: #0ff;">有约束和规范的企业级</span> `Web` 开发框架
- 适用于 `企业级` 项目
- 大大降低了团队的沟通成本和项目的维护成本
- 安全有保障
- `v2.x+` 基于 `cjs` , `v3.x+` 有可能支持 `ESM`

在 `阿里巴巴` 的应用

![01-egg在阿里.png](D:\xsjcTony\it666\Frontend-Learning\Notes\服务端\images\01-egg在阿里.png)

![02-Nodejs在阿里.png](D:\xsjcTony\it666\Frontend-Learning\Notes\服务端\images\02-Nodejs在阿里.png)

---

## 安装



### 手动安装

- 核心 

```shell
npm i egg
```

- 本地开发调试 [本地开发 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/development.html)
  - 在 `package.json` 的 `scripts` 中添加 `"dev": "egg-bin dev"`

```shell
npm i -D egg-bin
```

- 上线部署项目 [应用部署 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/deployment.html)

```shell
npm i egg-scripts
```



### 脚手架工具

- 使用 `egg-init` [egg-init - npm](https://www.npmjs.com/package/egg-init)

```shell
npm i -g egg-init
egg-init
npm i
```

- 指令

```shell
npm run dev # 开发环境
npm run test # 调试环境
npm run start # 上线环境
```

---

## 目录规范

[目录结构 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/structure.html)

- `Egg` 中有非常严谨的规范, 包括 `目录` / `文件名` , 若不遵循规范就无法运行

```
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

由框架约定的目录

- `app/router.js` 用于配置 URL 路由规则，具体参见 [Router](https://eggjs.org/zh-cn/basics/router.html)。
- `app/controller/**` 用于解析用户的输入，处理后返回相应的结果，具体参见 [Controller](https://eggjs.org/zh-cn/basics/controller.html)。
- `app/service/**` 用于编写业务逻辑层，可选，建议使用，具体参见 [Service](https://eggjs.org/zh-cn/basics/service.html)。
- `app/middleware/**` 用于编写中间件，可选，具体参见 [Middleware](https://eggjs.org/zh-cn/basics/middleware.html)。
- `app/public/**` 用于放置静态资源，可选，具体参见内置插件 [egg-static](https://github.com/eggjs/egg-static)。
- `app/extend/**` 用于框架的扩展，可选，具体参见[框架扩展](https://eggjs.org/zh-cn/basics/extend.html)。
- `config/config.{env}.js` 用于编写配置文件，具体参见[配置](https://eggjs.org/zh-cn/basics/config.html)。
- `config/plugin.js` 用于配置需要加载的插件，具体参见[插件](https://eggjs.org/zh-cn/basics/plugin.html)。
- `test/**` 用于单元测试，具体参见[单元测试](https://eggjs.org/zh-cn/core/unittest.html)。
- `app.js` 和 `agent.js` 用于自定义启动时的初始化工作，可选，具体参见[启动自定义](https://eggjs.org/zh-cn/basics/app-start.html)。关于`agent.js`的作用参见[Agent机制](https://eggjs.org/zh-cn/core/cluster-and-ipc.html#agent-机制)

由内置插件约定的目录

- `app/public/**` 用于放置静态资源，可选，具体参见内置插件 [egg-static](https://github.com/eggjs/egg-static)。
- `app/schedule/**` 用于定时任务，可选，具体参见[定时任务](https://eggjs.org/zh-cn/basics/schedule.html)。

---

## 配置 (Config)

[Config 配置 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/config.html)

配置文件的三种格式

```js
module.exports = {
  key: value
}
```

```js
exports.key = value
```

```js
module.exports = (appInfo) => {
  return {
    key: value
  }
}
```



### 多环境配置

- 在 `config` 目录下, 可以定义多个 `运行环境` 的 `配置文件`

  - `config.default.js` : 默认配置文件, 所有环境都会加载, 一般也会作为开发环境的默认配置文件

  - `config.prod.js` : 只有上线环境会加载

  - `config.local.js` : 只有开发环境会加载

  - `config.unittest.js` / `config.test.js` : 只有测试环境会加载

- 如果出现了同名配置, 具名配置文件会覆盖 `config.default.js` 中的配置



### 运行环境

[运行环境 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/env.html)

- 有两种方式可以指定 `Egg` 的运行环境

  - 通过 `config/env` 文件指定, 文件内容就是 `运行环境`

  ```
  prod
  ```

  - 通过 `EGG_SERVER_ENV` 环境变量指定 `运行环境`
    - 可以配合 `cross-env` 使用

  ```shell
  EGG_SERVER_ENV=prod npm start
  ```

  ```json
  "scripts": {
    "dev": "cross-env EGG_SERVER_ENV=dev egg-bin dev",
    "prod": "cross-env EGG_SERVER_ENV=prod egg-scripts start --daemon"
  }
  ```

- 可以通过 `app.config.env` 来获取当前的 `运行环境`

---

## 路由 (Router)

[路由（Router） - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/router.html)

定义

- 描述请求 `URL` 和具体承担执行动作的 `controller` 的对应关系



文件结构

- `app/router.js` 用于统一所有 `路由`



书写方式

- `router.js` 必须暴露一个方法
  - 接收一个 `app` 参数, 是服务器的实例对象

```js
// app/router.js
module.exports = (app) => {
  const { router, controller } = app
  /* ... */
}
```



使用路由

- verb - 用户触发动作，支持 get，post 等所有 HTTP 方法，后面会通过示例详细说明。
  - router.head - HEAD
  - router.options - OPTIONS
  - router.get - GET
  - router.put - PUT
  - router.post - POST
  - router.patch - PATCH
  - router.delete - DELETE
  - router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
  - router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页。
- router-name 给路由设定一个别名，可以通过 Helper 提供的辅助函数 `pathFor` 和 `urlFor` 来生成 URL。(可选)
- path-match - 路由 URL 路径。
- middleware1 - 在 Router 里面可以配置多个 Middleware。(可选)
- controller - 指定路由映射到的具体的 controller 上，controller 可以有两种写法：
  - `app.controller.user.fetch` - 直接指定一个具体的 controller
  - `'user.fetch'` - 可以简写为字符串形式

```js
router.verb('path-match', app.controller.action)
router.verb('router-name', 'path-match', app.controller.action)
router.verb('path-match', middleware1, ..., middlewareN, app.controller.action)
router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action)
```



---

## 控制器 (Controller)

[控制器（Controller） - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/controller.html)

定义

- 负责解析用户输入
- 调用对应的 `service` 方法处理业务
- 得到业务结果后封装并返回



文件结构

- 在 `app/controller` 目录下, 可以新建任意 `目录` / `多级目录` / `文件`



书写方式

- 通过定义 `Controller` 类来编写
- 在 `router` 中根据 `文件名` 和 `方法名` 来定位 (必须是驼峰式命名)

```js
// app/controller/home.js
const { Controller } = require('egg')

class HomeController extends Controller {
  async index () {
    /* ... */
  }
}

module.exports = HomeController
```

```js
// app/router.js
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index) // 调用 app/controller/home.js 中的 Controller 的 index() 方法
}
```



`Controller` 类

- 有如下属性挂载在 `this` 上
  - `this.ctx`: <span style="color: #0ff;">和 `KOA2` 中的 `ctx` 相同.</span> 当前请求的上下文 [Context](https://eggjs.org/zh-cn/basics/extend.html#context) 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
  - `this.app`: 当前应用 [Application](https://eggjs.org/zh-cn/basics/extend.html#application) 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
  - `this.service`：应用定义的 [Service](https://eggjs.org/zh-cn/basics/service.html)，通过它我们可以访问到抽象出的业务层，等价于 `this.ctx.service` 。
  - `this.config`：应用运行时的[配置项](https://eggjs.org/zh-cn/basics/config.html)。
  - `this.logger`：logger 对象，上面有四个方法（`debug`，`info`，`warn`，`error`），分别代表打印四个不同级别的日志，使用方法和效果与 [context logger](https://eggjs.org/zh-cn/core/logger.html#context-logger) 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。



### 请求参数

处理方法

- 在 `Egg` 中获取 `请求参数` 和在 `KOA2` 中基本相同
  - `POST` 请求参数需要注意 `CSRF` 相关设置


```js
class HomeController extends Controller {
  // 传统 get 请求参数
  async getQuery () {
    this.ctx.body = this.ctx.query // 或 this.ctx.request.query
  }

  // 动态路由 get 请求参数
  async getParams () {
    this.ctx.body = this.ctx.params
  }

  // post 请求参数
  async getBody () {
    this.ctx.body = this.ctx.request.body
  }
}
```



### 静态资源

文件结构

- 放在 `app/public` 目录中

处理方法

- `Egg` 内部已经处理过, 无需额外配置
- 访问 http://127.0.0.1:7001/public/xxx



### 动态资源

文件结构

- 放在 `app/view` 中

处理方法

- 使用对应模板引擎的插件, 比如 `egg-view-ejs` [egg-view-ejs - npm](https://www.npmjs.com/package/egg-view-ejs)

- 进行相应配置

  - `config/plugin.js`

  ```js
  module.exports = {
    /* ... */
    ejs: {
      enable: true,
      'package': 'egg-view-ejs'
    }
  }
  ```

  - `config/config.default.js`

  ```js
  module.exports = {
    /* ... */
    view: {
      mapping: {
        '.html': 'ejs'
      }
    }
  }
  ```

- 通过 `await this.ctx.render()` 渲染

```js
class HomeController extends Controller {
  // 动态资源
  async getHome () {
    await this.ctx.render('index', {
      msg: 'Aelitaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    })
  }
}
```



### Cookie

[Cookie 与 Session - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/cookie-and-session.html)

处理方法

- 在 `Egg` 中获取 / 设置 `cookie` 和在 `KOA2` 中基本相同
- 通过 `this.ctx.cookies` 操作

```js
class HomeController extends Controller {
  // 设置 cookie
  async setCookie () {
    this.ctx.cookies.set('name', 'Tony', {
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      signed: true, // 对 cookie 进行签名
      encrypt: true
    })
    this.ctx.body = 'cookie has been successfully set'
  }

  // 获取 cookie
  async getCookie () {
    this.ctx.body = this.ctx.cookies.get('name', {
      signed: true,
      encrypt: true
    })
  }
}
```

数据安全

- 在 `Egg` 中为了安全着想, 设置 `cookie` 时会给数据生成一个签名 (通过 `signed` 配置, 默认为 `true`
  - 获取数据时, 会再利用获取到的数据生成一个签名 (需要设置 `signed` 为 `true` )
    - 若一致, 表明数据在客户端没有被篡改
    - 若不一致, 表名数据在客户端被篡改了
  - 根据 `config/config.default.js` 中的 `keys` 来生成签名

```js
module.exports = {
  keys: 'Aelita' // cookie secret key,
}
```

- 通过设置 `encrypt` 为 `true` (默认为 `false` ) 将 `cookie` 进行加密处理, 这样在客户端就看不到明文
  - 在获取数据时, 也需要设置 `encrypt` 为 `true` , 否则不会解密



### Session

[Cookie 与 Session - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/cookie-and-session.html#session)

- 通过内置的 `egg-session` 插件处理 [eggjs/egg-session: session plugin for egg](https://github.com/eggjs/egg-session)

处理方法

- 通过 `ctx.session` 来访问 / 修改当前用户的 `Session`
- 删除的方法是将其赋值为 `null`

```js
ctx.session = null
```

外部存储

[eggjs/egg-redis: redis plugin for egg](https://github.com/eggjs/egg-redis)

[eggjs/egg-session-redis: redis store for egg session](https://github.com/eggjs/egg-session-redis)

- 利用 `egg-redis` 配合 `egg-session-redis` 实现 

---

## 插件 (Plugin)

[插件 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/plugin.html)

定义

- 一个迷你的 `app` , 一个特殊的 `中间件`
- 包含 `Service` / `中间件` / `配置` / `框架扩展` 等等
- 没有独立的 `Router` / `Controller`
- 无需关心先后顺序, 会在应用启动时就自动注册



使用

- 通过 `npm` 进行安装 / 复用
  - 通过 `^` 的方式引入依赖, 并且不要锁定版本

```shell
npm i egg-pluginName
```

- 在 `app/config/plugin.js` 中声明

```js
module.exports = {
  pluginName: {
    enable: true,
    'package': 'pluginPackageName'
  }
}
```



---

## 服务 (Service)

[服务（Service） - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/service.html)

定义

- 用于做业务逻辑封装
- 是一个 `抽象层`
- 一般用于
  - 复杂数据的处理
  - 数据库交互
  - 第三方服务的调用 / 网络数据



文件结构

- 在 `app/service` 目录下, 可以新建任意 `目录` / `多级目录` / `文件`



书写方式

- 通过定义 `Service` 类来编写
- 在 `controller` 中使用 `this.service` 或 `this.ctx.service` , 然后根据 `文件名` 和 `方法名` 来定位 (必须是驼峰式命名)

```js
const { Service } = require('egg')

class HomeService extends Service {
  async findNews () {
    /* ... */
  }
}

module.exports = HomeService
```

```js
// app/controller/home.js
class HomeController extends Controller {
  // 处理网络数据 (调用 service)
  async getNews () {
    this.ctx.body = await this.service.home.findNews()
  }
}
```



`Service` 类

- 有如下属性挂载在 `this` 上
  - `this.ctx`: <span style="color: #0ff;">和 `KOA2` 中的 `ctx` 相同.</span> 当前请求的上下文 [Context](https://eggjs.org/zh-cn/basics/extend.html#context) 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
    - `this.ctx.curl` 发起网络调用。
    - `this.ctx.service.otherService` 调用其他 Service。
    - `this.ctx.db` 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块。
  - `this.app`: 当前应用 [Application](https://eggjs.org/zh-cn/basics/extend.html#application) 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
  - `this.service`：应用定义的 [Service](https://eggjs.org/zh-cn/basics/service.html)，通过它我们可以访问到抽象出的业务层，等价于 `this.ctx.service` 。
  - `this.config`：应用运行时的[配置项](https://eggjs.org/zh-cn/basics/config.html)。
  - `this.logger`：logger 对象，上面有四个方法（`debug`，`info`，`warn`，`error`），分别代表打印四个不同级别的日志，使用方法和效果与 [context logger](https://eggjs.org/zh-cn/core/logger.html#context-logger) 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。



### 网络数据

- 通过 `await this.ctx.curl('url')` 获取
  - `get` 请求的参数直接通过 `?` 拼接在 `url` 中
  - 接收一个额外配置 `对象`
    - `method` : 请求方法, 默认为 `get`
    - `data` : `post` 请求的参数, 是一个 `对象`
    - `dataType` : `post` 请求参数的类型, 比如 `'json'`
- 如果结果是 `Buffer` , 可以通过 `JSON.parse()` / `Buffer.from(data).toString()` 处理

---

## 日志 (Logger)

[日志 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/logger.html)

- `Egg` 内置了日志模块 `egg-logger`
- 存储在 `logs` 目录中



### 分类

- `appLogger` : `${appInfo.name}-web.log`，例如 `example-app-web.log`，应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它。
- `coreLogger` : `egg-web.log` 框架内核、插件日志。
- `errorLogger` : `common-error.log` 实际一般不会直接使用它，任何 logger 的 `.error()` 调用输出的日志都会重定向到这里，重点通过查看此日志定位异常。
- `agentLogger` : `egg-agent.log` agent 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里。
- `scheduleLogger` : `egg-schedule.log` 定时任务日志 [定时任务 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/schedule.html)



### 级别

- `Egg` 中的日志共分 `5` 个级别, 从低到高分别为
  - NONE
  - DEBUG
  - INFO
  - WARN
  - ERROR
- 默认情况下只会输出 `INFO` 及以上 ( `WARN` & `ERROR` )
- 可以通过 `config/config.default.js` 修改输出的日志级别 (指定级别及以上)

```js
module.exports = {
  /* ... */
  logger: {
    level: 'DEBUG' // 输出 DEBUG 及以上
  }
}
```



### 打印日志

- Context Logger
  - 处理请求时需要打印日志时使用

```js
this.ctx.logger.debug('debug logger')
this.ctx.logger.info('info logger')
this.ctx.logger.warn('warn logger')
this.ctx.logger.error('error logger')
```

- App Logger
  - 需要应用级别的日志记录时使用
- Agent Logger
  - 在 `Agent` 进程运行代码时使用



### 切割

- 由内置插件 `egg-logrotator` 提供支持
- 按天切割 (默认, 无需配置)
  - 在每天 `00:00` 按照 `.log.YYYY-MM-DD` 文件名进行切割
- 按文件大小切割

```js
// config/config,default.js
const path = require('path')

module.exports = (appInfo) => {
  return {
    logrotator: {
      filesRotateBySize: [
        path.join(appInfo.root, 'logs', appInfo.name, 'egg-web.log')
      ]
      maxFileSize: 2 * 1024 * 1024 * 1024 // 超过 2G 就切割
    }
  }
}
```

- 按照小时切割

```js
// config/config.default.js
const path = require('path')

module.exports = appInfo => {
  return {
    logrotator: {
      filesRotateByHour: [
        path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log')
      ]
    }
  }
}
```

---

## 定时任务 / 计划任务 (Scheduled Tasks)

[定时任务 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/schedule.html)

定义

- 有些场景会需要使用 `定时任务` 
  - 定时上报应状态
  - 定时进行文件切割, 删除临时文件
  - 定时从远程接口更新本地缓存
- `Egg` 提供了一套机制让 `定时任务` 的编写和维护更加优雅
- 可以通过 `app.runSchedule(path)` 来手动执行定时任务 (基于 `app/schedule` 的相对路径 / 绝对路径)



文件结构

- 在 `app/schedule` 目录下, 可以新建任意 `文件`
- 每一个 `文件` 都是一个独立的 `定时任务` , 可以配置定时任务的属性和要执行的方法



书写方式

- 通过定义 `Subscription` 类来编写
- 在 `controller` 中使用 `this.service` 或 `this.ctx.service` , 然后根据 `文件名` 和 `方法名` 来定位 (必须是驼峰式命名)

```js
const { Subscription } = require('egg')
const { Buffer } = require('node:buffer')

class UpdateCache extends Subscription {
  static get schedule () {
    return {
      interval: '3s', // 每 3秒 执行一次 , 1分钟则为 '1m', 以此类推
      type: 'all' // 指定是否所有 NodeJS 进程都需要执行该定时任务, all 为全部执行, worker 为随机一个进程执行
    }
  }

  async subscribe () {
    const response = await this.ctx.curl('http://127.0.0.1:7001/getMsg')
    console.log(Buffer.from(response.data).toString())
  }
}

module.exports = UpdateCache
```



`Subscription` 类

- 有如下属性挂载在 `this` 上
  - `this.ctx`: <span style="color: #0ff;">和 `KOA2` 中的 `ctx` 相同.</span> 当前请求的上下文 [Context](https://eggjs.org/zh-cn/basics/extend.html#context) 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
    - `this.ctx.curl` 发起网络调用。
    - `this.ctx.service.otherService` 调用其他 Service。
    - `this.ctx.db` 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块。
  - `this.app`: 当前应用 [Application](https://eggjs.org/zh-cn/basics/extend.html#application) 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
  - `this.service`：应用定义的 [Service](https://eggjs.org/zh-cn/basics/service.html)，通过它我们可以访问到抽象出的业务层，等价于 `this.ctx.service` 。
  - `this.config`：应用运行时的[配置项](https://eggjs.org/zh-cn/basics/config.html)。
  - `this.logger`：logger 对象，上面有四个方法（`debug`，`info`，`warn`，`error`），分别代表打印四个不同级别的日志，使用方法和效果与 [context logger](https://eggjs.org/zh-cn/core/logger.html#context-logger) 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。

- `static get schedule ()` 用于配置定时任务的执行事件间隔等配置
- `async subscribe ()` 为真正定时任务被执行时, 要运行的函数

---

## 启动配置 (App Startup Config)

[启动自定义 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/app-start.html)

定义

- 在启动期间进行一些初始化工作
- 等初始化完成后应用才可以启动成功并开始对外提供服务



文件结构

- 在根目录下, 创建 `app.js` 文件



书写方式

- 通过定义一个 `类` 来编写, 并暴露出去
- 在其中通过 `生命周期方法` 来执行启动应用过程中的初始化工作

```js
class AppBootHook {
  constructor(app) {
    this.app = app
  }
  
  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook
```



### 生命周期函数

[加载器（Loader） - 为企业级框架和应用而生](https://eggjs.org/zh-cn/advanced/loader.html#life-cycles)

- 配置文件即将加载，这是最后动态修改配置的时机（`configWillLoad`）
- 配置文件加载完成（`configDidLoad`）
- 文件加载完成（`didLoad`）- async
- 插件启动完毕（`willReady`）- async
- worker 准备就绪（`didReady`）- async
- 应用启动完成（`serverDidReady`）- async
- 应用即将关闭（`beforeClose`）- async

图示

![egg_life_cycle.png](D:\xsjcTony\it666\Frontend-Learning\Notes\服务端\images\egg_life_cycle.png)

---

## 扩展 (Extend)

[框架扩展 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/extend.html)

定义

- 有时候 `Egg` 内部提供的方法不一定能满足需求

- 可以扩展
  - Application
  - Context
  - Request
  - Response
  - Helper



文件结构

- 扩展文件存放于 `app/extend` 中
- 文件名分别为
  - `application.js`
  - `context.js`
  - `request.js`
  - `response.js`
  - `helper.js`



### 扩展方式

- 方法扩展

  - 扩展后方法会被绑定到相应的 `对象` 上 (比如 `application.js` 中的方法就会变成 `app.xxx()`

  - `this` 是其对应的 `对象` (比如 `application.js` 中对应的就是 `app` 对象)

```js
module.exports = {
  myTest (param) {
    /* ... */
  }
}
```

- 属性扩展 (只能应用于 `Application` / `Context` *(不确定)* )
  - 为了避免重复计算, 使用 `Symbol` + `Getter`

```js
const TEST = Symbol('Application#test')

module.exports = {
  get test () {
    if (!this[TEST]) { // this指向其对应的 对象
      this[TEST] = xxx
    }
    return this[TEST]
  }
}
```



### Helper

- 用于封装一些实用的 `utility` 函数
- 通过 `ctx.helper` 访问

---

## 中间件 (Middleware)

[中间件（Middleware） - 为企业级框架和应用而生](https://eggjs.org/zh-cn/basics/middleware.html)

定义

- `Egg` 的 `中间件` 和 `KOA2` 中的是一样的



文件结构

- 存放在目录 `app/middleware` 下, 可以新建任意 `文件`
- 一个 `文件` 就是一个 `中间件`



书写方式

- `中间件` 文件必须暴露一个方法, 接收两个参数
  - `options` : 中间件的配置项, 由 `app.config[${ middlewareName }]` 导入
  - `app` : 当前 `Application` 的实例对象

- `中间件` 内部写法和 `KOA2` 一致

```js
// app/router.js
module.exports = (options, app) => async (ctx, next) => {
  /* ... */
}
```



使用中间件

- 通过 `配置文件` 加载自定义中间件, 并决定他们的顺序
  - `数组` 中的 `字符串` 为 `中间件` 的 `文件名`
  - 全局有效

```js
module.exports = {
  /* ... */
  middleware: ['middlewareFileName'],
  middlewareFileName: { // 会被传到中间件的 options 中
    key: value
  }
}
```

- 在 `router` 中使用
  - 只针对单个 `路由` 生效

```js
module.exports = (app) => {
  const { router, controller } = app

  const middleware = app.middleware.middlewareFileName({ key: value })

  router.get('/testMiddleware', middleware, otherMiddlewares, controller.home.action)
}
```

---

## 国际化 / 多语言 (i18n)

[国际化（I18n） - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/i18n.html)

定义

- 让网页在不同国家显示不同语言
- 让网页支持语言切换
- 由内置模块 `egg-i18n` 提供 [egg-i18n - npm](https://www.npmjs.com/package/egg-i18n)



文件结构

- `I18n` 多语言文件存放在 `config/locale` 目录下
- 可以是 `js` 也可以是 `json`

```js
// en-US.js
module.exports = {
  Email: 'Email',
  username: 'username',
  password: 'password'
}
```

```js
// zh-CN.js
module.exports = {
  Email: '邮箱',
  username: '用户名',
  password: '密码'
}
```



使用多语言

- 通过 `ctx.__(key)` / `ctx.gettext(key)` 获取



切换语言

- 修改后的当前语言会记录到 `locale` 这个 `cookie` 中, 以便下次直接使用设定好的语言
- 修改方法的优先级从高到低
  1. query: `/?locale=en-US`
  2. cookie: `locale=zh-TW`
  3. header: `Accept-Language: zh-CN,zh;q=0.5`



默认语言

- 在 `配置文件` 中通过 `i18n.defaultLocale` 设置默认语言
  - 默认为 `en-US`

```js
module.exports = {
  /* ... */  
  i18n: {
    defaultLocale: 'en-US'
  }
}
```

---

## MySQL

[MySQL - 为企业级框架和应用而生](https://eggjs.org/zh-cn/tutorials/mysql.html)

- <span style="color: #f90">不支持 `MySQL v8.0+` 的安全机制, 因为使用的是 `mysql` , 并不是 `mysql2`</span>

基本使用

- 需要安装插件 `egg-mysql` [eggjs/egg-mysql: MySQL plugin for egg](https://github.com/eggjs/egg-mysql)

```shell
npm i egg-mysql
```

- 在 `config/plugin.js` 中开启插件

```js
module.exports = {
  /* ... */
  mysql: {
    enable: true,
    'package': 'egg-mysql'
  }
}
```

- 在 `config/config.${ env }.js` 中配置数据库连接信息
  - 示例为 `单数据源` , `多数据源` 见文档

```js
module.exports = {
	/* ... */
  mysql: {
    client: {
      host: '127.0.0.7',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'demo'
    },

    app: true, // 是否加载到 app 上, 默认为 true
    agent: false // 是否加载到 agent 上, 默认为 false
  }
}
```

- 在 `Service` 层中编写数据库相关代码
  - 通过 `this.ctx.app.mysql` 来访问

```js
class HomeService extends Service {
  async insertUser ({ name, age }) {
    this.ctx.app.mysql.insert('user', { name, age })
    return 
  }
}
```

- 具体 `CRUD` 操作见文档

---

## Sequelize

[Sequelize - 为企业级框架和应用而生](https://eggjs.org/zh-cn/tutorials/sequelize.html)

基本使用

- 安装 `egg-sequelize` 插件 [eggjs/egg-sequelize: Sequelize for Egg.js](https://github.com/eggjs/egg-sequelize)
- 安装 `mysql2` (如果使用 `MySQL` 数据库的话)

```shell
npm i egg-sequelize mysql2
```

- 在 `config/plugin.js` 中开启插件

```js
module.exports = {
  /* ... */
  sequelize: {
    enable: true,
    'package': 'egg-sequelize'
  }
}
```

- 在 `config/config.${ env }.js` 中配置数据库连接信息
  - 示例为 `单数据源` , `多数据源` 见文档

```js
module.exports = {
	/* ... */
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'demo'
  }
}
```

- 在 `app/model` 目录下编写 `Model`

```js
module.exports = (app) => {
  const { /* DataTypes */ } = app.Sequelize

  const newModel = app.model.define('tableName', {
    /* columns */
  }, {
    /* options */
  })

  return newModel
}
```

- 在 `Service` 层中编写数据库相关代码
  - 通过 `this.ctx.model.newModel` / `this.ctx.app.model.newModel` 来访问

```js
class HomeService extends Service {
  async insertUser ({ name, age }) {
    try {
      const res = await this.ctx.model.User.create({ name, age })
      console.log(res)
      return res.toJSON()
    } catch (err) {
      console.error(err)
      return '插入失败'
    }
  }
}
```

- 具体 `CRUD` 操作见 `Egg` 文档 / `Sequelize` 文档

---

## 安全

[安全 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/security.html)



### CSRF

定义

- [CSRF](https://www.owasp.org/index.php/CSRF)（Cross-site request forgery跨站请求伪造，也被称为 `One Click Attack` 或者 `Session Riding`，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。 CSRF 攻击会对网站发起恶意伪造的请求，严重影响网站的安全。因此框架内置了 CSRF 防范方案。

防范方式

- Synchronizer Tokens：通过响应页面时将 token 渲染到页面上，在 form 表单提交的时候通过隐藏域提交上来。
- Double Cookie Defense：将 token 设置在 Cookie 中，在提交（POST、PUT、PATCH、DELETE 等）请求时提交 Cookie，并通过 header 或者 body 带上 Cookie 中的 token，服务端进行对比校验。
- Custom Header：信任带有特定的 header（例如 `X-Requested-With: XMLHttpRequest`）的请求。这个方案可以被绕过，所以 rails 和 django 等框架都[放弃了该防范方式](https://www.djangoproject.com/weblog/2011/feb/08/security/)。



`Egg` 中的使用方式

方式一 (用于动态渲染网页)

- 在 `form` 请求中增加一个名称为 `_csrf` 的 `url query` , 值为 `ctx.csrf` (动态渲染时使用)

```html
<form method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
```

- 可以在 `配置文件` 中修改 `_csrf`

```js
// config/config.default.js
module.exports = {
  /* ... */
  security: {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf' // 通过 body 传递 CSRF token 的默认字段为 _csrf
    }
  }
}
```

方式二 (用于静态网页)

- 通过 `ajax` 请求, 从 `cookie` 中取到 `csrfToken` , 放到 `query` / `body` / `header` 中发送给服务端

- 通过 `header` 传递的字段可以在 `配置文件` 中修改

```js
// config/config.default.js
module.exports = {
  /* ... */
  security: {
    csrf: {
      headerName: 'x-csrf-token' // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    }
  }
}
```



刷新 `csrfToken`

- 如果一个浏览器上发生用户切换, 却没有刷新 `csrfToken` , 容易带来安全问题
- 通过 `ctx.rotateCsrfSecret()` 来刷新 `csrfToken`

---

## 使用TypeScript

- 使用 `egg-init` 脚手架创建 `TypeScript` 项目

```TypeScript
egg-init projectName --type=
```

