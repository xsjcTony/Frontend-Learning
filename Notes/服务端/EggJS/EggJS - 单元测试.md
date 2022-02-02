# EggJS (v2.x) - 单元测试



> [单元测试 - 为企业级框架和应用而生](https://eggjs.org/zh-cn/core/unittest.html)



## 依赖



### 脚手架

- 若使用 `egg-init` 脚手架创建项目, 则无需管下面的, 直接编写测试文件, 通过 `npm run test` 进行测试即可



### 测试框架

[Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/)

- 使用 `Mocha` 

```shell
npm i -D mocha
```



### Assert

[power-assert - npm](https://www.npmjs.com/package/power-assert)

- 使用 `power-assert`

```shell
npm i -D power-assert <one of instrumentors>
```



### 测试运行工具

- 使用 `egg-bin`

```json
{
  "scripts": {
    "test": "egg-bin test"
  }
}
```



### 模拟

[egg-mock - npm](https://www.npmjs.com/package/egg-mock)

- 使用 `egg-mock`

```shell
npm i -D egg-mock
```

---

## 文件结构

- `test` 目录用于存放所有有关 `测试` 的文件
- 所用测试文件都必须以 `.test.js` 结尾
- `目录` 为需要测试的模块, 比如 `app` / `controller` 等
- 简而言之, `test` 之下的 `目录结构` 要和被测试的应用结构一致

```
test
├── controller
│   └── home.test.js
├── hello.test.js
└── service
    └── user.test.js
```

---

## 导入依赖

- `app` : 模拟的应用程序实例对象 ( `ctx.app` )

- `mock` : 辅助模块对象, 可以模拟 `ctx` / `cookie` / `session` / `网络请求` 等

- `assert` : Assertion对象, 用于判断测试结果

```js
const { app, mock, assert } = require('egg-mock/bootstrap')
```

---

## Mocha相关



### describe()

- 在基于 `Mocha` 的测试文件中, 一个 `describe()` 函数就是一组相关的测试
- `describe()` 中可以嵌套 `describe()`
- 参数
  - `title` : 这组测试的名称, 推荐为被测试文件的名称
  - `fn` : 编写这组测试具体代码的 `函数`

```js
describe('test/app/controller/home.test.js', () => {
  // test cases
})
```



### it()

- 在基于 `Mocha` 的测试文件中, 一个 `it()` 函数就是一个测试用例
- 可以用来测试一个 `方法` / `函数` 等
- 参数
  - `title` : 当前测试用例的名称
  - `fn` : 编写这个测试用例具体代码的 `函数`

```js
describe('test/app/controller/user.test.js', () => {
  it('testCaseName', () => {
    
  })
})
```



### 生命周期钩子

[Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/#hooks)

作用

- 可以在测试用例执行之前去申请一些资源
- 可以在测试用例执行之后去释放申请的资源
- 比如在测试之前往数据库中添加一些数据, 测试完毕之后删除这些数据

**每组** 测试用例的执行顺序为: `before` -> LOOP ( `beforeEach` -> `it()` -> `afterEach` ) -> `after`

- `before` : 在所有测试用例之前执行一次
- `beforeEach` : 在每个 `it()` 测试用例之前都执行一次, 在 `before` 之后
- `after` : 在所有测试用例执行完毕之后都执行一次
- `afterEach` : 在每个 `it()` 测试用例执行完毕之后执行一次, 在 `after` 之前

```
before
beforeEach
it1
    √ test case 1
afterEach
beforeEach
it2
    √ test case 2
afterEach
after
```

格式

- 共分三种
  - 匿名函数
  - 具名函数
  - 描述 + 函数

```js
before(() => { /* ... */ })
before(function namedFunc () { /* ... */ })
before('description', () => { /* ... */ })
```



### 异步代码

- 有三种方法可以让 `Mocha` 识别这是一个异步测试
  - 给 `it()` 的回调函数添加一个 `done` 参数, 通过调用 `done()` 来实现
  - 在代码中包含 `Promise`
  - 使用 `async` / `await`

```js
it('async test', async () => {
  await app.httpRequest().get('/public/login.html').expect(200)
})
```



---

## mock



### app

```js
const { app } = require('egg-mock/bootstrap')
```



### ctx

- 想要挂载在 `ctx` 上的数据可以通过 `options` 传入

```js
const { app } = require('egg-mock/bootstrap')

const ctx = app.mockContext(options) // 在 it() 中
```



---

## Assert

- 使用 `power-assert`

[power-assert-js/power-assert: Power Assert in JavaScript. Provides descriptive assertion messages through standard assert interface. No API is the best API.](https://github.com/power-assert-js/power-assert)

基本使用

- 大部分情况下, 只需要使用 `assert(any_expression)` 一个函数即可

其他 `API`

power-assert enhances these assert functions by [espower](https://github.com/power-assert-js/espower). Produces descriptive message when assertion is failed.

- [`assert(value, [message\])`](https://nodejs.org/api/assert.html#assert_assert_value_message)
- [`assert.ok(value, [message\])`](https://nodejs.org/api/assert.html#assert_assert_ok_value_message)
- [`assert.equal(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message)
- [`assert.notEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message)
- [`assert.strictEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message)
- [`assert.notStrictEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message)
- [`assert.deepEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message)
- [`assert.notDeepEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message)
- [`assert.deepStrictEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message)
- [`assert.notDeepStrictEqual(actual, expected, [message\])`](https://nodejs.org/api/assert.html#assert_assert_notdeepstrictequal_actual_expected_message)

power-assert is fully compatible with [assert](https://nodejs.org/api/assert.html). So functions below are also available though they are not enhanced (does not produce descriptive message).

- [`assert.fail(actual, expected, message, operator)`](https://nodejs.org/api/assert.html#assert_assert_fail_actual_expected_message_operator_stackstartfunction)
- [`assert.throws(block, [error\], [message])`](https://nodejs.org/api/assert.html#assert_assert_throws_block_error_message)
- [`assert.doesNotThrow(block, [message\])`](https://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_error_message)
- [`assert.ifError(value)`](https://nodejs.org/api/assert.html#assert_assert_iferror_value)

---

## egg-mock



### post请求csrf问题

```js
app.mockCsrf()

app.httpRequest().post(url).send(data) // ...
```

---

## 测试报告

- 报告会生成在 `coverage` 目录中



### 生成

- 通用方法

```shell
egg-bin cov
```

- `egg-init` 脚手架生成的项目

```shell
npm run cov
```































