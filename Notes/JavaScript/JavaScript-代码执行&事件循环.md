# JavaScript - 代码执行 & 事件循环



## 基本概念

- JavaScript是 `单线程` 的
- JavaScript中的代码都是 `串行` 的, 前面没有执行完毕后面不能执行

---

## 同步 / 异步代码 & 事件循环



### 定义

- 同步 / 异步代码

    - 除了 `事件绑定的函数` 和 `回调函数` 以外的都是同步代码

- 事件循环

    - JavaScript在运行时会自动加上一些代码
    - 永远都会添加在所有代码的最后

    ```js
    // 事件循环
    let arr = []; // 存储异步代码
    let index = 0;
    let length = arr.length;
    while(true) {
      let item = arr[index];
      if(item.xxx === xxx) {
        // 执行异步代码
      }
      index++;
      if(index === length) {
        index = 0; // 将index归为, 再次开始遍历所有异步代码
      }
    }
    
    ```



### 代码执行过程

- 程序会从上至下依次执行所有的 `同步代码`
- 执行过程中碰到 `异步代码` 会将 `异步代码` 放到 `事件循环` 中
- 所有 `同步代码` 执行完毕后, JavaScript会不断检测 `事件循环` 中的 `异步代码` 是否满足条件
- 一旦满足条件就会执行满足条件的 `异步代码` (具体顺序见 `宏任务 & 微任务` )

---

## 宏任务 & 微任务 (MacroTask & MicroTask)



### 定义

- JavaScript的 `异步代码` 中区分为 `宏任务 (MacroTask)` 和 `微任务 (MicroTask)`

- `宏任务` 为比较费时 (慢) 的代码
- `微任务` 为不怎么费时 (快) 的代码
- 所有的 `宏任务` / `微任务` 都会放到自己的执行队列中, 即有两个任务队列
- 所有放到队列中的任务都采用 `先进先出原则` (FIFO), 多个任务同时满足条件时会执行先进入队列的



### 常见任务

宏任务

- `setTimeout`
- `setInterval`
- `setImmediate` (IE独有)
- ...

微任务

- `Promise`
- `MutationObserver`
- `process.nextTick` (NodeJS独有)
- ...



### 完整代码执行过程

1. 程序会从上至下依次执行所有的 `同步代码`
2. 执行过程中碰到 `异步代码` 会将 `异步代码` 放到 `事件循环` 中, 根据 `宏任务` / `微任务` 分别存储进自己的队列
3. 所有 `同步代码` 执行完毕后, 开始执行 `事件循环`
4. 执行 `微任务` 队列中所有满足条件的代码, 采用 `FIFO` 原则
5. 执行 `宏任务` 队列中所有满足条件的代码, 采用 `FIFO` 原则
6. 每执行完一个 `宏任务` , 都会立刻检查 `微任务` 队列有没有被清空, 如果没有就立刻清空 (用于 `宏任务` 中新增了 `微任务` 的情况)
7. 重复 `4~6`

```js
// 输出结果为 syncStart syncEnd p4 s1 p1 p2 s3 s4 s2 p3

setTimeout(() => {
  console.log('s1')
  Promise.resolve().then(() => { console.log('p1') })
  Promise.resolve().then(() => { console.log('p2') })

  setTimeout(() => {
    console.log('s2')
    Promise.resolve().then(() => { console.log('p3') })
  })
}, 0)

console.log('syncStart')

Promise.resolve().then(() => {
  console.log('p4')
  setTimeout(() => { console.log('s3') })
  setTimeout(() => { console.log('s4') })
})

console.log('syncEnd')
```



