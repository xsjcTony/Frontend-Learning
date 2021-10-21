# webpack - 原理 (principle)

- 针对webpack `v4.x` 版本, `v5.x` 版本是否适用有待考证

- **`babel` 版本为 `7.x` , bug很多, `8.x` 等出了需要重新看 `API`**



## AST (抽象语法树)



### 基本概念

定义

- 全称为 `Abstract Syntax Tree`
- 以树状的形式表现编程语言的语法结构

链接

- 自动生成 `AST` : [AST explorer](https://astexplorer.net/)
- 常见节点类型: [babylon/spec.md at master · babel/babylon](https://github.com/babel/babylon/blob/master/ast/spec.md)

生成过程

1. 读取 `源代码`
2. 词法分析: 从左到右一个字符一个字符地读入 `源代码` ，从中识别出一个个 `单词` , `符号` 等
3. 语法分析: 在 `词法分析` 的基础上根据当前编程语言的语法, 将单词序列组合成各类语法短语
4. 形成 `AST`

```js
// 1.读取源代码: let sum = 10 + 66;

// 2.词法分析:

//  单词      单词    符号     数字         符号      数字      符号
 |  let  |    sum   |  =  |    10     |     +    |   66   |     ;   |

 [
   {"type": "word", value: "let"}
   {"type": "word", value: "sum"}
   {"type": "Punctuator", value: "="}
   {"type": "Numeric", value: "10"}
   {"type": "Punctuator", value: "+"}
   {"type": "Numeric", value: "66""}
   {"type": "Punctuator", value: ";"}
 ]

// 3.语法分析:

// 关键字    标识符      赋值运算符      字面量     二元运算符    字面量   结束符号
 |  let  |    sum   |       =      |     10     |      +     |   66   |     ;   |
 
 [
   {
     "type": "VariableDeclaration",
     "content": {
       {"type": "kind", value: "let"} // kind 表示是什么类型的声明
       {"type": "Identifier", value: "sum"} // Identifier 表示是标识符
       {"type": "init", value: "="} // init 表示初始值的表达式
       {"type": "Literal", value: "10"} // Literal 表示是一个字面量
       {"type": "operator", value: "+"} // operator 表示是一个二元运算符
       {"type": "Literal", value: "66""}
       {"type": "Punctuator", value: ";"}
     }
   }
 ]

// 4.生成抽象语法树
{
  'type': 'Program',
  'start': 0,
  'end': 18,
  'body': [
    {
      'type': 'VariableDeclaration',
      'kind': 'let',
      'start': 0,
      'end': 18,
      'declarations': [
        {
          'type': 'VariableDeclarator',
          'start': 4,
          'end': 17,
          'id': {
            'type': 'Identifier',
            'start': 4,
            'end': 7,
            'name': 'sum'
          },
          'init': {
            'type': 'BinaryExpression',
            'start': 10,
            'end': 17,
            'left': {
              'type': 'Literal',
              'start': 10,
              'end': 12,
              'value': 10,
              'raw': '10'
            },
            'operator': '+',
            'right': {
              'type': 'Literal',
              'start': 15,
              'end': 17,
              'value': 66,
              'raw': '66'
            }
          }
        }
      ]
    }
  ]
}
```



### 代码 => AST

```js
const babel = require('@babel/core')
const util = require('util') // 用于完整浏览对象和彩色打印

// 代码 => AST
const code = `let sum = 10 + 66;`
const ast = babel.parseSync(code)
console.log(util.inspect(ast, {
  depth: null, // 完整展开对象
  colors: true, // 根据数据类型添加色彩
  breakLength: 180 // 换行展示的数据长度
}))
```



### 修改AST

- `enter()` : 只要遍历到一个 `节点` 就会调用
- 任何 `AST` 中的 `type` 都有自己对应的方法, 比如 `Identifier()` 就会遍历并在每一个 `Identifier` `节点` 并调用
- `NodePath` : 是一个 `对象` , 会作为参数自动随着上述 `方法` 传递进来, 其中保存了当前遍历到的 `节点`
    - 常用属性
        - `node` : 当前节点
        - `parent` : 父节点
        - `parentPath` : 父 `NodePath`
        - `scope` : 作用域
        - `context` : 上下文
    - 常用方法
        - `get()` : 当前节点
        - `findParent()` : 向父节点搜寻节点
        - `getSibling()` : 获取兄弟节点
        - `replaceWith()` : 用 `AST` 节点替换该节点
        - `replaceWithMultiple()` : 用多个 `AST` 节点替换该节点
        - `insertBefore()` : 在节点前插入节点
        - `insertAfter()` : 在节点后插入节点
        - `remove()` : 删除节点
        - `stop()` : 停止遍历

```js
const babel = require('@babel/core')

// 遍历+修改 AST
babel.traverse(ast, {
  Identifier (path) {
    path.node.name = 'add' // 将标识符 sum 改为 add
  }
})
```

- 示例

```js
const babel = require('@babel/core')

const code = `
  console.log('Tony')
  let sum = 10 + 66
  let minus = 66 - 33
  console.log('it666')
`
const ast = babel.parse(code)

// 删除包含 sum 的这句话
babel.traverse(ast, {
  Identifier (path) {
    if (path.node.name === 'sum') {
      path.parentPath.remove() // 在只定义一个变量的时候, 删除 VariableDeclarator 和删除 VariableDeclaration 效果是一样的
    }
  }
})

// AST => 代码
const { code: result } = babel.transformFromAstSync(ast)
console.log(result)
/*
console.log('Tony');
let minus = 66 - 33;
console.log('it666');
*/
```





### AST => 代码

```js
// AST => 代码
const { code: result } = babel.transformFromAstSync(ast) // {code, map, ast}
console.log(result) // let add = 10 + 66;
```



### 创建AST

使用 `@babel/types`

[@babel/types · Babel](https://babeljs.io/docs/en/babel-types)

安装

```shell
npm i -D @babel/types
```

使用

- 具体 `API` 参考文档
- 创建节点应由内向外

```js
const babel = require('@babel/core')
const t = require('@babel/types')
const util = require('util') // 用于完整浏览对象和彩色打印

// 创建空白AST
const code = ``
const ast = babel.parse(code)

// 由内向外创建节点
const left = t.numericLiteral(10)
const right = t.numericLiteral(66)
const init = t.binaryExpression('+', left, right)
const id = t.identifier('sum')
const variableDeclarator = t.variableDeclarator(id, init)
const variableDeclaration = t.variableDeclaration('let', [variableDeclarator])
// 将节点插入AST
ast.program.body.push(variableDeclaration)

// AST => 代码
const { code: result } = babel.transformFromAstSync(ast)
console.log(result) // let sum = 10 + 66;
```

---

## 打包



### 原理

- 打包之后的内容被放到了一个 `立即执行函数` 中
- 将 `入口` 作为 `key` , 将文件的内容作为 `value` , 整体作为一个对象传递给该 `立即执行函数`

- 该函数的内容
    1. 初始化一个 `缓存`
    2. 自己实现了一个 `require` 方法
        1. 判断 `缓存` 中有没有当前需要使用的 `模块`
        2. 自己创建一个 `缓存`
        3. 根据拿到的 `入口` 路径取到对应的文件内容
        4. 执行文件中的代码
        5. 多文件的话会将导入的文件先用自己的 `require` 方法导入然后再执行 入口文件中的代码
    3. 执行该 `require` 方法, 将 `入口` 的路径传递进去



### 打包单文件实现思路

- 创建一个可以执行的包
- 写一个Compiler用来读取 `webpack.config.js`
- 写一个 `ejs` 模板, 其中放上根据上述原理写出的代码
- 替换模板中的代码并写进输出文件中



### 打包多文件实现思路

- 在单文件打包的基础上, 处理入口文件导入的 `模块`
    - 保存主模块地址
    - 定义保存当前 `模块` 所有依赖的 `数组`
    - 将代码转换为 `AST`
    - 寻找 `require()` 方法
    - 将 `require` 替换为 `__webpack_require__`
    - 将路径拼接上主模块地址 (注意将路径中的 `\\` 或 `\` 修改为 `/` )
    - 将依赖加入 `数组`
    - 将 `AST` 重新转换为代码
- 遍历上述过程中的依赖 `数组` , 将其中的文件按照单文件打包思路再操作一遍
- 修改 `ejs` 模板遍历存储好的 `模块` 数组即可

---

## Loader

[Loader Interface | webpack](https://webpack.js.org/api/loaders/)

定义

- 本质上是一个 `函数`
- 自定义一个 `模块` , 并在 `模块` 中暴露这个 `函数` , 在 `函数` 中实现 `Loader` 相关功能

注意点

- 不能是 `箭头函数` , 必须是 `普通函数`
- `webpack` 在执行的时候会修改 `this` , 对 `箭头函数` 是无效的

参数

- `content` : 源文件的内容
- `map` : 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
- `meta` : meta数据，可以是任何内容



### 参数处理

定义

- 用于处理 `webpack配置文件` 中的 `loader` 相关的 `options`

方法

- 在 `Loader` 的 `函数` 中使用 `this.query` 获取 `options` `对象`

校验

- 用于校验参数的 `名称` / `数据类型` 是否正确

- 使用 `schema-utils` [schema-utils - npm](https://www.npmjs.com/package/schema-utils)

- 安装 `npm i -D schema-utils`

    ```js
    // ReplaceLoader.js
    const { validate } = require('schema-utils')
    
    /**
     * @param {string|Buffer} content 源文件的内容
     * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
     * @param {any} [meta] meta 数据，可以是任何内容
     */
    module.exports = function (content, map, meta) {
      // get options
      const options = this.query
      // set validate rules
      const schema = {
        type: 'object', // type of options must be an object
        properties: { // properties can be passed in
          name: {
            type: 'string' // type of property name must be string
          }
        },
        additionalProperties: false
      }
    
      validate(schema, options, { name: 'ReplaceLoader', baseDataPath: 'options' })
    
      return content.replace(/Tony/g, this.query.name)
    }
    ```



### 同步Loader

- 正常开发 `函数` 功能
- 如果 `loader` 中没有返回 `string` 或者 `Buffer` , 那么就会报错
- 代码见上述 `参数处理`



### 异步Loader

- 在 `同步Loader` 的基础上
- 使用 `this.async()` 获取 `callback`
- 调用 `callback` 来返回结果
- `callback` 接收4个参数
    - `err` : 一个 `Error` 或者 `null`
    - `result` : 一个 `string` 或者 `Buffer`
    - `map` : 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
    - `meta` : meta数据，可以是任何内容

```js
/**
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
module.exports = function (content, map, meta) {
  // get options
  const options = this.query
  // get async callback
  const callback = this.async()
  // async operations
  setTimeout(() => {
    const result = content.replace(/Tony/g, options.name)
    // invoke callback
    callback(null, result, map, meta)
  }, 3000)
}
```



### Loader功能实现

- 在读取文件的方法中获取 `配置文件` 中的 `rules`
- 遍历这些 `rules` , 使用 `test` 中的规则来判断文件是否需要被 `loader` 处理
- 需要的话从 `loader` 的最后一个开始遍历, 引入 `loader`
- 使用 `loader` 处理文件
- 返回文件内容

---

## Plugin

[Plugin API | webpack](https://webpack.js.org/api/plugins/)

定义

- 本质上是一个 `类`
- 可以在打包过程中的特定阶段执行

原理

- 通过 `Tapable` 在不同的阶段发送了不同的通知
- 编写 `plugin` 时需要注册我们需要监听的通知



### Tapable

[tapable - npm](https://www.npmjs.com/package/tapable)

[Plugin API - Tapable | webpack](https://webpack.js.org/api/plugins/#tapable)

定义

- 一套 `发布订阅模式` 的实现

发布订阅模式

- `订阅者` 将联系方式添加到了 `发布者` 的缓存列表中
- `发布者` 达成条件后就会遍历缓存列表依次通知所有 `订阅者`

安装

```shell
npm i -D tapable
```

引入

- 按需导入

```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} = require("tapable")
```



#### 钩子 (Hook) 类型

##### 同步钩子

- 通过 `tap()` 方法绑定
- 通过 `call()` 方法调用
    - `SyncHook` : 同步串行钩子
        - 在 `触发事件` 后按照 `绑定` 的先后顺序执行所有的 `事件处理函数`
        - 不关心 `事件处理函数` 的返回值
    - `SyncBailHook` : 同步串行钩子
        - 在 `触发事件` 后按照 `绑定` 的先后顺序执行所有的 `事件处理函数`
        - 关心 `事件处理函数` 的返回值
        - 只要有一个 `事件处理函数` 的返回值不是 `undefined` , 那么会中断执行, 忽略后面所有的 `事件处理函数`
    - `SyncWaterfallHook` : 同步串行钩子
        - 在 `触发事件` 后按照 `绑定` 的先后顺序执行所有的 `事件处理函数`
        - 关心 `事件处理函数` 的返回值
        - 会将上一个 `事件处理函数` 的返回值作为参数传递给下一个 `事件处理函数`
    - `SyncLoopHook` : 同步串行钩子
        - 在 `触发事件` 后按照 `绑定` 的先后顺序执行所有的 `事件处理函数`
        - 关心 `事件处理函数` 的返回值
        - 如果当前 `事件处理函数` 的返回值不是 `undefined` , 那么就会重新执行 `事件处理函数` 队列, 直到所有 `事件处理函数` 都返回 `undefined` 为止

##### 异步钩子

- 若 `事件处理函数` 中有 `异步代码` , 则必须使用 `异步钩子`

- 通过 `tapAsync()` / `tapPromise()` 方法绑定

- 通过 `callAsync()` / `promise()` 方法调用

    - `AsyncParallelHook` : 异步并行钩子

        - 在 `触发事件` 后会同时执行所有的 `事件处理函数`

        - 不关心 `事件处理函数` 的返回值

        - `tapAsync()` 方法绑定会有

            - 会自动传递一个 `callback` 参数给 `事件处理函数`
            - 每个 `事件处理函数` 执行完毕之后必须通过 `callback` 告诉系统已经执行完毕了
            - 当所有 `事件处理函数` 都调用过 `callback` 之后, 告诉 `callAsync()` 所有 `事件处理函数` 已经全部执行完毕了

            ```js
            const { AsyncParallelHook } = require('tapable')
            
            class Lesson {
              constructor () {
                this.hooks = {
                  // 创建发布者对象, 用于处理Vue订阅和发布
                  vue: new AsyncParallelHook(['description']),
                }
              }
              tap () {
                // 绑定事件 (订阅消息)
                this.hooks.vue.tapAsync('zs', (description, callback) => {
                  setTimeout(() => {
                    console.log('zs', description)
                    callback()
                  }, 3000)
                })
              }
              call () {
                // 触发事件 (发布消息)
                this.hooks.vue.callAsync('Vue课程上线了', () => { console.log('end') })
              }
            }
            
            const lesson = new Lesson()
            lesson.tap()
            lesson.call()
            ```

        - `tapPromise()` 方法绑定会有

            - 必须返回一个 `Promsie` 对象
            - `异步代码` 执行完毕后必须调用 `resolve()` 告诉系统已经执行完毕了
            - 当所有 `事件处理函数` 都调用过 `resolve()` 之后, 告诉 `promise()` 所有 `事件处理函数` 已经全部执行完毕了

            ```js
            const { AsyncParallelHook } = require('tapable')
            
            class Lesson {
              constructor () {
                this.hooks = {
                  // 创建发布者对象, 用于处理Vue订阅和发布
                  vue: new AsyncParallelHook(['description']),
                }
              }
              tap () {
                // 绑定事件 (订阅消息)
                this.hooks.vue.tapPromise('zs', (description) => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      console.log('zs', description)
                      resolve()
                    }, 3000)
                  })
                })
              }
              call () {
                // 触发事件 (发布消息)
                this.hooks.vue.promise('Vue课程上线了').then(() => { console.log('end') })
              }
            }
            
            const lesson = new Lesson()
            lesson.tap()
            lesson.call()
            ```

    - `AsyncSeriesHook` : 异步串行钩子

        - 在 `触发事件` 后按照 `绑定` 的先后顺序执行所有的 `事件处理函数`
        - 先执行的 `事件处理函数` 必须执行完毕才会执行后面的
        - 若没有执行 `callback` 回调函数或调用 `resolve()` 告知执行完毕, 那么后面的所有 `事件处理函数` 都不会被执行
        - 其他和 `AsyncParallelHook` 一样
        
    - `AsyncSeriesWaterfallHook` : 异步串行钩子
    
        - 和 `AsyncSeriesHook` 一样
        - 会将上一个 `事件处理函数` 的返回值作为参数传递给下一个 `事件处理函数`
        - 若函数执行出现问题, 在 `callback` 中返回 `error` 或调用 `reject()` , 会跳过执行剩余的 `事件处理函数` 并直接结束

​    

### 编写Plugin

- `webpack` 在打包时会自动调用插件 `类` 中的 `apply()` 方法, 传入一个参数 `compiler`
    - `compiler.options` : `webpack` 的 `配置文件`
    - `compiler.hooks` : `webpack` 提供的基于 `Tapable` 的 `钩子` [Compiler Hooks | webpack](https://webpack.js.org/api/compiler-hooks/)
        - `entryOption` : 给 `webpack` 编译器传递 `配置文件` 后
        - `run` : `webpack` 编译器 `run` 方法被执行
        - `emit` : 打包文件写入之前
        - `afterEmit` : 打包文件写入之后
        - `done` : 打包完成

- 通过插件 `类` 中的 `constructor()` 来获取 `options`



### Plugin功能实现

- 本质上就是利用 `Tapable` 增加 `钩子`

