# async / await



> [async function - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
>
> [await - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)



## 定义

- \>=ES8
- 用同步的流程表示异步操作
- 本质是 `Generator` 中的第三种应用场景的缩写
- `await` 关键字只能在 `async` 函数中使用, 不能单独出现



## 返回值

- `async` 函数一定会返回一个 `Promise对象` 
- 如果指定返回值不是 `Promise对象` , 那么会被包裹在 `Promise对象` 中再返回



## 基本格式

```js
function request () {
  return new Promise((resolve, reject) => resolve('123'))
}

async function test () {
  let res = await request()
  console.log(res)
}

test() // 123
```



## 示例

```js
function request () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('data fetched.')
    }, 1000)
  })
}

async function gen () {
  let res1 = await request()
  console.log(res1, 1)
  let res2 = await request()
  console.log(res2, 2)
  let res3 = await request()
  console.log(res3, 3)
}

gen()
// 一秒后
// data fetched. 1
// 两秒后
// data fetched. 2
// 三秒后
// data fetched. 3
```



## 异常捕捉

- `async` 函数中不会自动捕捉异常, 如有异常发生, 会被抛出, 需要在调用 `async` 函数的时候使用 `catch()` 来捕捉

```js
function request () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('data fetch failed.')
    }, 1000)
  })
}

async function gen () {
  let res1 = await request()
  console.log(res1, 1)
  let res2 = await request()
  console.log(res2, 2)
  let res3 = await request()
  console.log(res3, 3)
}

gen().catch(error => console.log(error))
// 一秒后
// data fetch failed.
```



