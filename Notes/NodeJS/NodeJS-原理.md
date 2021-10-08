# NodeJS - 原理 / 实现



## require()



### 原理

1. 内部实现一个 `require` 方法
2. 该方法通过 `Module` 对象的静态 `_load` 方法加载模块文件
3. 通过 `Module` 对象的静态 `_resolveFilename` 方法得到绝对路径, 并添加扩展名
4. 根据路径判断是否有缓存, 如果没有就创建一个新的 `Module` 模块对象并缓存起来
5. 利用 `tryModuleLoad` 方法加载模块
    1. 取出模块扩展名
    2. 根据不同扩展名查找不同方法, 并执行对应方法加载模块
    3. 如果是 `JSON` 就转换成对象
    4. 如果是 `JavaScript` 就包裹成一个函数
    5. 执行包裹成函数之后的代码, 拿到执行结果
    6. 利用 `call` 执行 `fn` 函数, 修改 `module.exports` 的值
        - 将其通过参数传入, `fn` 函数中的 `exports.xxx = yyy` 会修改 `module.exports`
    7. 返回 `module.exports`



### 实现

```js
// 01-a.js
exports.name = 'Tony'

```



```js
const path = require('path')
const fs = require('fs')
const vm = require('vm')

class AModule {
  constructor (id) {
    this.id = id
    this.exports = {}
  }

  static wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});
  ]

  static _cache = {}

  static _extensions = {
    '.js': function (module) {
      // 1. read JavaScript code
      const script = fs.readFileSync(module.id, 'utf-8')

      // 2. wrap code as a Function
      const scriptStr = AModule.wrapper[0] + script + AModule.wrapper[1]

      // 3. convert code string to real code
      const scriptCompiled = vm.runInThisContext(scriptStr)

      // 4. run compiled code
      scriptCompiled.call(module.exports, module.exports)
    },
    '.json': function (module) {
      const json = fs.readFileSync(module.id, 'utf-8')
      module.exports = JSON.parse(json)
    }
  }
}

function aRequire(filePath) {
  // 1. convert relative path to absolute path
  const absolutePath = path.join(__dirname, filePath)

  // 2. try to load current module from cache
  const cachedModule = AModule._cache[absolutePath]
  if (cachedModule) {
    return cachedModule.exports
  }

  // 3. create new Module and cache it if not cached
  const module = new AModule(absolutePath)
  AModule._cache[absolutePath] = module

  // 4. use tryModuleLoad() to load module
  tryModuleLoad(module)

  // 5. return module's exports
  return module.exports
}

function tryModuleLoad(module) {
  // 1. get module's extension (count as .js by default)
  let extension = path.extname(module.id)
  if (!extension) {
    extension = '.js'
    module.id += '.js'
  }

  // 2. invoke load module method based on the extension
  AModule._extensions[extension](module)
}

const sampleModule = aRequire('./01-a.js')

console.log(sampleModule) // { name: 'Tony' }
```



### 面试题

- `NodeJS` 中的 `this` 为什么是一个空对象 `{}`
    - 任何 `NodeJS` 的代码在执行的时候都会被先包装到 `(function (exports, require, module, __filename, __dirname) {}` 函数中
    - 执行包装好的函数时, `this` 会被修改为 `module.exports`
    - 而 `module.exports` 一开始又被定义为一个空对象 `{}`
    - 本质上 `this` 就是 `exports`

- `NodeJS` 中为什么可以直接使用 `exports` / `require` / `module` / `__filename` / `__dirname`

    - 任何 `NodeJS` 的代码在执行的时候都会被先包装到 `(function (exports, require, module, __filename, __dirname) {}` 函数中
    - 所以可以直接使用这五个变量
    - 他们虽然可以直接使用, 但本质上不属于 `global` 全局对象

- `NodeJS` 中为什么不能直接给 `exports` 赋值, 但可以给 `module.exports` 赋值

    - 任何 `NodeJS` 的代码在执行的时候都会被先包装到 `(function (exports, require, module, __filename, __dirname) {}` 函数中
    - 所以 `exports` 本质是一个传进来的形参, 指向 `module.exports`

    ![exports_modify.png](D:\xsjcTony\it666\Frontend-Learning\Notes\NodeJS\images\exports_modify.png)

    - 直接给 `exports` 赋值会让其指向另一个东西, 并不会修改 `module.exports`

    ![exports_assign.png](D:\xsjcTony\it666\Frontend-Learning\Notes\NodeJS\images\exports_assign.png)

    - 由于 `module` 也作为参数传进来了, 所以直接给 `module.exports` 赋值可以修改, 但不推荐

- 通过 `require` 导入 `包` 的时候应该使用 `var` / `let` 还是 `const`
    - 导入包的目的是使用包而不是修改, 所以导入包的时候应该使用 `const`

---

## 事件循环 (EventLoop)

- 事件新环基本概念以及浏览器事件环详见 `JavaScript => 代码执行&事件循环`



### 和浏览器事件环的区别

- NodeJS中有 `6` 个任务队列, 而浏览器中只有 `2` 个 ( `微任务` 和 `宏任务` )
- NodeJS中没有专门存储 `微任务` 的队列
- NodeJS中只有同步代码执行完毕 / 任务队列之间切换的时候会执行满足条件的 `微任务` 代码

```
NodeJS中执行微任务代码的时机
           ┌───────────────────────┐
           │同步代码 
           └──────────┬────────────┘
                      │
                      │ <---- 执行满足条件微任务代码
                      │
           ┌──────────┴────────────┐
        ┌> │timers                 │ 执行setTimeout() 和 setInterval()中到期的callback
 执     │  └──────────┬────────────┘
 行     │             │
 满     │             │ <---- 执行满足条件微任务代码
 足     │             │
 条     │  ┌──────────┴────────────┐
 件     │  │poll                   │ 执行与I/O相关的回调 (除了close回调、定时器回调和setImmediate()之外，几乎所有回调都执行)
 的     │  └──────────┬────────────┘
 微     │             │
 任 --> │             │ <---- 执行满足条件微任务代码
 务     │             │
        │  ┌──────────┴────────────┐
        └──┤check                  │ 执行setImmediate的callback
           └───────────────────────┘
```

- NodeJS中 `微任务` 同时满足执行条件时, 会按照 `优先级` 执行, 而浏览器中会采用 `FIFO` 的方式执行
    - `process.nextTick` 比 `Promise` 的优先级高
    - 同类型事件中才是 `FIFO`



### 任务队列

定义

- NodeJS事件环有 `6` 个事件队列, 而浏览器只有 `2` 个 ( `微任务` 和 `宏任务` )

6个事件队列分别为

- `timers`
    - 执行 `setTimeout()` 和 `setInterval()` 中到期的 `callback`
- `pending callbacks`
    - 执行系统操作的回调
    - 比如 `tcp` / `udp` 通信的错误 `callback`
- `idle` , `prepare`
    - 只在NodeJS内部使用
- `poll`
    - 执行与 `I/O` 相关的回调
    - 除了 `timers` / `check` / `close callbacks` 之外的 `回调函数` 都几乎都执行
- `check`
    - 执行 `setImmediate()` 的 `callback`
- `close callbacks`
    - 执行 `close` 事件的 `callback`
    - 比如 `socket.on('close', callback)`

```
NodeJS中的任务队列
   ┌───────────────────────┐
┌> │timers                 │ 执行setTimeout() 和 setInterval()中到期的callback
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │pending callbacks      │ 执行系统操作的回调, 如:tcp, udp通信的错误callback
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │idle, prepare          │ 只在内部使用
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │poll                   │ 执行与I/O相关的回调 (除了close回调、定时器回调和setImmediate()之外，几乎所有回调都执行)
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │check                  │ 执行setImmediate的callback
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤close callbacks        │ 执行close事件的callback，例如socket.on("close",func)
   └───────────────────────┘
```

队列的切换

- 执行完除了 `poll` 之外的队列时, 会切换到下一个队列
- 执行完 `poll` 队列之后, 会按照上述顺序直接切换到下一个有任务的队列 (切换时执行 `微任务` )
- 若查找了一圈回到自己, 所有队列都没有任务时, 就会阻塞在 `poll` 队列不再切换, 防止浪费资源



### 面试题

- 下面代码的输出结果是什么

    ```js
    const path = require('path')
    const fs = require('fs')
    
    fs.readFile(path.join(__dirname, '07-b.js'), () => {
      setTimeout(() => { console.log('setTimeout') })
      setImmediate(() => { console.log('setImmediate') })
    })
    ```

    - 输出结果为先 `setImmediate` 后 `setTimeout`
    - 如果单纯的是 `setTimeout()` 和 `setImmediate()` 那么输出结果是随机的, 因为在NodeJS中指定的延迟时间是有一定误差的
    - 但是如果将他们放在 `readFile()` 中, 那么首先就会执行 `poll` 队列的 `callback` , 然后按照队列顺序依次执行
    - `poll` 之后的队列是 `check` , 然后才是 `timers` 所以结果是先 `setImmediate` 后 `setTimeout`

