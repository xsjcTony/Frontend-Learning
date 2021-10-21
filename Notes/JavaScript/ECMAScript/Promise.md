# Promise



> [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)



## 定义

- `ES6` 中新增的 `异步编程` 解决方案
- 在代码中的表现是一个 `对象`

---

## 作用

- 在企业开发中为了保存 `异步代码` 的执行顺序, 会出现回调函数的套娃
- 如果套娃层数太多, 代码的阅读性和可维护性会极差
- <span style="color: yellow">`Promise对象` 可以将 `异步操作` 以 `同步` 的流程来表示, 避免了回调函数套娃</span>

---

## 基本使用



### 创建 `Promise对象`

- `Promise对象` 不是异步的, 只要创建了就会立即执行其中的代码

```js
new Promise(function (resolve, reject) {})
```



### 状态 (Status)

定义

- `Promise对象` 是通过状态的改变来通过同步流程表示异步操作的
- 状态一旦发生改变就会自动触发对应的函数

<span style="color: yellow">三种状态</span>

- `pending` : 默认状态, 只要没有告诉 `Promise` 任务是成功还是失败就是 `pending` 状态
- `fulfilled (resolved)` : 只要调用 `resolve` 函数, 状态就会变为 `fulfilled` , 表示操作成功
- `rejected` : 只要调用 `reject` 函数, 状态就会变为 `rejected` , 表示操作失败

注意点

- 状态的改变是不可逆的, 一旦从 `pending` 变为 `fulfilled` 或 `rejected` 其中之一, 那么永远都是那个状态



### 监听状态的改变 (回调函数)

- 一旦 `Promise对象` 的状态改变, 那么就会自动执行回调函数
    - `fulfilled` 状态对应 `then()`
    - `rejected` 状态对应 `catch()`
- 如果 `rejected` 状态没有被监听, 那么就会报错

---

## `then()`



> [Promise.prototype.then() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)



### 参数

- 第一个参数为切换到 `fulfilled` 状态时的回调函数
- 第二个参数为切换到 `rejected` 状态时的回调函数
- 本质上两个参数就等于 `then` 中的两个回调函数

```js
let promise = new Promise(function (resolve, reject) {
  resolve();
  // reject();
});

promise.then(function () {
  console.log("success"); // executes when resolve() is called --> status: fulfilled
}, function () {
  console.log("fail"); // executes when reject() is called --> status: rejected
});
```



### 给回调函数传递参数

- 修改 `Promise` 状态时, 可以传递参数给 `then` 方法中的回调函数

```js
let promise = new Promise(function (resolve, reject) {
  resolve("123");
  // reject("456");
});

promise.then(function (data) {
  console.log(data); // 123
}, function (data) {
  console.log(data); // 456
});
```



### 多次调用

- 同一个 `Promise` 可以多次调用 `then` 方法
- 当 `Promise` 状态改变时, 所有 `then` 方法都会被执行

```js
// fulfilled 会输出 success1 success2
// rejected 会输出 fail1 fail2
let promise = new Promise(function (resolve, reject) {
  resolve();
  // reject("456");
});

promise.then(function () {
  console.log("success1");
}, function () {
  console.log("fail1");
});

promise.then(function () {
  console.log("success2");
}, function () {
  console.log("fail2");
});
```



### 返回新 `Promise对象`

- `then` 方法每次执行完毕后都会返回一个<span style="color: yellow">新的</span> `Promise对象`
- 新的 `Promise对象` 会继承原有的 `Promise对象` 的状态

```js
let promise = new Promise(function (resolve, reject) {
  resolve();
  // reject("456");
});

let promise2 = promise.then(function () {
  console.log("success1");
}, function () {
  console.log("fail1");
});

console.log(promise2); // Promise {<pending>}
console.log(promise === promise2); // false
```



### 给新 `Promise` 的 `then` 传递参数



#### 传递普通数据类型

- 通过回调函数中使用 `return data` 即可传递参数
- 无论是在 `fulfilled` 还是 `rejected` 状态的回调函数中传递参数, 都只会传给下一个 `then` 中的 `fulfilled` 状态的回调函数

```js
/*
会打印如下内容
fail1 aaa
success2 bbb
*/
let promise = new Promise(function (resolve, reject) {
  // resolve("111");
  reject("aaa");
});

let promise2 = promise.then(function (data) { // 状态为rejected, 执行第二个(失败)回调函数
  // 不执行
  console.log("success1", data);
  return "222";
}, function (data) {
  // 执行
  console.log("fail1", data);
  return "bbb"; // 传递给下一个 then 的第一个回调函数 (成功)
});

promise2.then(function (data) { // 被传递了普通数据类型, 所以执行第一个(成功)回调函数
  // 执行, data = "bbb"
  console.log("success2", data);
}, function (data) {
  // 不执行
  console.log("fail2", data);
});
```



#### 传递 `Promise对象`

- 除了普通数据类型, 还可以传递一个 `Promise对象`
- 下一个 `then` 方法执行哪个状态的回调函数以及获得的参数取决于这个传递过来的 `Promise对象`

```js
/*
会打印如下内容
fail1 aaa
success2 222
*/
let promise = new Promise(function (resolve, reject) {
  // resolve("111");
  reject("aaa");
});

let anotherPromise = new Promise(function (resolve, reject) {
  resolve("222");
  // reject("bbb");
});

let promise2 = promise.then(function (data) { // 状态为rejected, 所以执行第二个(失败)回调函数
  // 不执行
  console.log("success1", data);
  return anotherPromise;
}, function (data) {
  // 执行
  console.log("fail1", data);
  return anotherPromise;
});

promise2.then(function (data) { // 被传递了Promise对象, 状态为fulfilled, 执行第一个(成功)回调函数, 参数为"222"
  // 执行
  console.log("success2", data);
}, function (data) {
  // 不执行
  console.log("fail2", data);
});
```

---

## `catch()`



[Promise.prototype.catch() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)



### 本质

- 是一个语法糖, 相当于没有成功回调函数的 `then` 方法

```js
promise.then(undefined, () => {})
```

```js
let promise = new Promise(function (resolve, reject) {
  // resolve();
  reject();
});

promise.catch(function () {
  console.log("fail");
});
```



### 分开监听两种状态

- 想要分开监听 `fulfilled` 与 `rejected` , 一定要使用 `链式编程` , 不然会报错

```js
let promise = new Promise(function (resolve, reject) {
  // resolve();
  reject();
});

promise.then(function () {
  console.log("success");
}).catch(function () {
  console.log("fail");
});
```



### 和 `then()` 一样的特点

- 在修改 `Promise` 状态为 `rejected` 时可以专递参数给回调函数
- 同一个 `Promise` 可以多次调用 `catch` 方法, 当状态改变为 `rejected` 时, 所有 `catch` 方法都会被执行
- `catch` 方法执行完毕之后也会返回一个新的 `Promise对象`
- 也可以通过 `return data` 给下一个 `Promise` 的 `then` 方法的成功的回调函数传递参数
- 除了基本数据类型也可以传递一个 `Promise对象` , 下一个 `then` / `catch` 方法执行哪个状态的回调函数以及获得的参数取决于这个传递过来的 `Promise对象`



### 捕获异常

- `catch` 方法可以捕获上一个 `Promise对象` 的 `then` 方法中的异常
- 异常存储在 `catch` 方法回调函数的参数中

```js
/*
会打印如下内容
success
fail ReferenceError: xxx is not defined
*/
let promise = new Promise(function (resolve, reject) {
  resolve();
  // reject();
});

promise.then(function () {
  console.log("success");
  xxx
}).catch(function (e) {
  console.log("fail", e);
});
```



### 放在所有 `then()` 的结尾

- 如果有一堆 `then()` 连续起来, 那么不用每个都监听失败回调函数或者写 `catch()` , 放在最后即可

```js
let promise = new Promise(function (resolve, reject) {
  resolve();
});

promise.then(function () {
  console.log("success1");
  xxx
}).then(function () {
  console.log("success2");
}).then(function () {
  console.log("success3");
}).catch(function (e) {
  console.log("fail", e); // 2, 3都不会执行, 然后会报错
});
```



---

## 异常



### 定义

- 有错误出现
- 由于JavaScript是单线程且代码为串行, 所以一旦前面的代码出现错误, 程序就会被中断, 后面的代码不会执行



### 处理

- 自身编写代码的问题: 手动修复 `BUG`
- 外界的原因 / 一些可预见的异常: 使用 `try{}catch{}`



### `try{}catch{}`

- 可以保证程序不被中断
- 可以记录错误原因便于后续优化迭代更新
- `try` 和 `catch` 是一个整体, 不能单独编写
- `try` 中写可能出现异常的代码, 如果没有出现异常, 那么会照常执行, `catch` 不会执行
- 如果 `try` 中出现了异常, 那么 `catch` 会捕获异常, 存储到参数中, 中断 `try` 中的代码, 继续往后执行外界代码

```js
try {
  // code might throw error
} catch(e) {
  // catch error thrown by code in try block
}
```

- 示例

```js
console.log("1"); // 1
try {
  say();
} catch(e) {
  console.log(e); // ReferenceError: say is not defined
}
console.log("2"); // 2
```



### 抛出异常

- 使用 `throw` 关键字抛出异常
- 异常可使用 `new Error()` 来创建
- 异常信息写在 `()` 中

```js
throw new Error("This is not a function.");
```

---

## `all()`



### 定义

- `Promise` 的 `静态方法` , 通过类名直接调用 `Promise.all()`

- 接收一个由 `Promise对象` 组成的 `数组` 
- 返回一个新的 `Promise对象` :
    - 如果 `数组` 中所有的 `Promise` 都成功了, 那么就会是成功, 信息包含一个存储了所有 `Promise` 成功回调函数的参数的 `数组`
    - 如果 `数组` 中有一个 `Promise` 失败了, 那么就会立即停止其他所有的 `Promise` 的执行, 状态变为失败, 信息是失败的那个 `Promise` 的失败回调函数的参数



### 示例

- 成功

```js
let promise1 = new Promise((resolve, reject) => resolve("123"));
let promise2 = new Promise((resolve, reject) => resolve("456"));
let promise3 = new Promise((resolve, reject) => resolve("789"));

Promise.all([promise1, promise2, promise3])
	.then(result => console.log(result)) // ["123", "456", "789"]
	.catch(error => console.log(error));
```

- 失败

```js
let promise1 = new Promise((resolve, reject) => resolve("123"));
let promise2 = new Promise((resolve, reject) => reject("456")); // 失败
let promise3 = new Promise((resolve, reject) => resolve("789"));

Promise.all([promise1, promise2, promise3])
	.then(result => console.log(result)) 
	.catch(error => console.log(error)); // 456
```

---

## `Race()`



### 定义

- `Promise` 的 `静态方法` , 通过类名直接调用 `Promise.race()`
- 接收一个由 `Promise对象` 组成的 `数组` 
- 其中任意一个 `Promise对象` 的状态改变了, 那么立即停驶其他所有 `Promise` 的执行, 成功或失败以及信息均取决于那个状态改变的 `Promise`
- 多用于接口测试和超时处理



### 示例

```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("111");
  }, 5000);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("222");
  }, 3000);
});

Promise.race([promise1, promise2])
	.then(result => console.log(result)) 
	.catch(error => console.log(error)); // 222
```

---

## 手动实现 (原理)



### 步骤归纳

1. 创建时必须传入一个函数, 否则就抛出异常
2. 给传入的函数设置两个回调函数
3. 新创建的 `Promise对象` 默认状态是 `pending`

    - 调用 `resolve()` 将状态变为 `fulfilled`

    - 调用 `reject()` 将状态变为 `rejected`
4. 状态一旦发生改变就不可再次改变
5. 可以通过 `then()` 来监听状态的改变

    - 如果添加监听时状态已经改变, 立即执行监听的回调函数

    - 如果添加监听时状态还未改变, 那么状态改变的时候再执行监听的回调函数
6. 可以通过 `resolve` 或 `reject` 给 `then` 的回调函数传递参数
7. 同一个 `Promise对象` 可以添加多个 `then` 监听, 状态发生改变时按序执行
8. `then` 方法每次执行完毕都会返回一个新的 `Promise对象`
9. 上一个 `Promise对象` 的 `then()` 可以给下一个 `Promise对象` 的 `then()` 传递数据

    - 无论上一个是在成功的还是失败的回调函数中传递的参数都会传递给下一个成功的回调函数
    - 如果上一个传递的是 `Promise对象` , 那么传给下一个的成功还是失败以及数据由传递的 `Promise对象` 决定
10. 后一个 `Promise对象` 的 `then()` 可以捕获前一个 `Promise对象` 的 `then()` 的异常
11. `catch()` 就是 `then(undefined, function () {})` 的语法糖
12. `all()` 方法接收一个由 `Promise对象` 组成的 `数组` , 返回一个新的 `Promise对象`
    - 如果 `数组` 中所有的 `Promise` 都成功了, 那么就会是成功, 信息包含一个存储了所有 `Promise` 成功回调函数的参数的 `数组`
    - 如果 `数组` 中有一个 `Promise` 失败了, 那么就会立即停止其他所有的 `Promise` 的执行, 状态变为失败, 信息是失败的那个 `Promise` 的失败回调函数的参数
13. `race()` 方法接收一个由 `Promise对象` 组成的 `数组` , 返回一个新的 `Promise对象`
    - 其中任意一个 `Promise对象` 的状态改变了, 那么立即停驶其他所有 `Promise` 的执行, 成功或失败以及信息均取决于那个状态改变的 `Promise`



### 代码

```js
// define constants for Promise status
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  /**
   * Construct the new Promise object.
   * @param {Function} handler - A function to be executed by the constructor, during the process of constructing the new Promise object.
   */
  constructor(handler) {
    // initialize default status to pending
    this.status = PENDING;
    // initialize parameters for callback function
    this.value = undefined;
    this.reason = undefined;
    // initialize monitor callback functions
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    // check if handler is a function, throw an error if not
    if(!this._isFunction(handler)) {
      throw new Error(handler + " is not a function.");
    }
    // pass two parameters (callback function) into handler
    handler(this._resolve.bind(this), this._reject.bind(this));
  }

  /**
   * Execute callback functions once the status of promise is changed
   * @param {Function} [onFulfilled] - Callback function on promise fulfilled.
   * @param {Function} [onRejected] - Callback function on promise rejected.
   * @returns {MyPromise} - A new Promise object
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((nextResolve, nextReject) => {
      // instant execute if status is fulfilled
      if(this.status === FULFILLED) {
        // check whether onFulfilled is passed in
        if(this._isFunction(onFulfilled)) {
          try {
            let result = onFulfilled(this.value);
            // check if result is a Promise object
            if(result instanceof MyPromise) {
              result.then(nextResolve, nextReject);
            }
            // not a Promise object
            else {
              // pass the returned value to the new Promise object's resolve callback function
              nextResolve(result);
            }
          } catch(e) {
            nextReject(e);
          }
        }
        // onFulfilled is undefined
        else if(arguments.length === 0) {
          nextResolve(this.value);
        }
      }

      // instant execute if status is rejected
      if(this.status === REJECTED) {
        try {
          // check if onRejected is undefined
          if(arguments.length < 2) {
            nextReject(this.reason);
          } else if(this._isFunction(onRejected)) {
            let result = onRejected(this.reason);
            // check if result is a Promise object
            if(result instanceof MyPromise) {
              result.then(nextResolve, nextReject);
            }
            // not a Promise object
            else {
              // pass the returned value to the new Promise object's resolve callback function
              nextResolve(result);
            }
          }
        } catch(e) {
          nextReject(e);
        }
      }

      // check if status is pending
      if(this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // check whether onFulfilled is passed in
          if(this._isFunction(onFulfilled)) {
            try {
              let result = onFulfilled(this.value);
              // check if result is a Promise object
              if(result instanceof MyPromise) {
                result.then(nextResolve, nextReject);
              }
              // not a Promise object
              else {
                // pass the returned value to the new Promise object's resolve callback function
                nextResolve(result);
              }
            } catch(e) {
              nextReject(e);
            }
          }
          // onFulfilled is undefined
          else if(arguments.length === 0) {
            nextResolve(this.value);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            // check if onRejected is undefined
            if(arguments.length < 2) {
              nextReject(this.reason);
            } else if(this._isFunction(onRejected)) {
              let result = onRejected(this.reason);
              // check if result is a Promise object
              if(result instanceof MyPromise) {
                result.then(nextResolve, nextReject);
              }
              // not a Promise object
              else {
                // pass the returned value to the new Promise object's resolve callback function
                nextResolve(result);
              }
            }
          } catch(e) {
            nextReject(e);
          }
        });
      }
    });
  }

  /**
   * Returns a Promise and deals with rejected cases only. It internally calls `obj.then(undefined, onRejected)`.
   * @param {Function} onRejected - Callback function on promise rejected.
   * @returns {MyPromise} - A new Promise object
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * Fulfill the promise.
   * @param {unknown} value - The value to pass into the callback function
   * @private
   */
  _resolve(value) {
    // change status to fulfilled (when pending)
    if(this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fn => fn(this.value));
    }
  }

  /**
   * Reject the promise.
   * @param {string} reason - The reason that promise is rejected.
   * @private
   */
  _reject(reason) {
    // change status to rejected (when pending)
    if(this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn(this.reason));
    }
  }

  /**
   * Check whether the argument is a function.
   * @param {unknown} fn - The function to check
   * @returns {boolean} `true` if fn is a function, otherwise `false`
   * @private
   */
  _isFunction(fn) {
    return typeof fn === "function";
  }

  /**
   * The `Promise.all()` method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.
   * @param {Iterable} list - An iterable object such as an Array.
   * @returns {MyPromise}
   * - An already resolved Promise if the iterable passed is empty.
   * - An asynchronously resolved Promise if the iterable passed contains no promises. Note, Google Chrome 58 returns an already resolved promise in this case.
   */
  static all(list) {
    return new MyPromise((resolve, reject) => {
      // Array to be passed into resolve function if all promise resolved
      let arr = [];
      // count promise resolved
      let resolvedCount = 0;
      // Iterate over list of promises
      for(let promise of list) {
        promise.then(msg => {
          arr.push(msg);
          if(++resolvedCount === list.length) {
            resolve(arr);
          }
        }).catch(error => reject(error));
      }
    });
  }

  /**
   * The `Promise.race()` method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
   * @param {Iterable} list - An iterable object such as an Array.
   * @returns {MyPromise} - A pending Promise that asynchronously yields the value of the first promise in the given iterable to fulfill or reject.
   */
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for(let promise of list) {
        promise.then(value => resolve(value)).catch(error => reject(error));
      }
    })
  }
}
```

---

## 实现 Promise 串行

[精读《用 Reduce 实现 Promise 串行执行》 - SegmentFault 思否](https://segmentfault.com/a/1190000016832285?utm_source=tag-newest)

```js
let myPromises = [/* Promise 数组*/]
// 完整写法
myPromises.reduce((previousPromise, nextPromise) => {
  return previousPromise.then(() => {
    return nextPromise()
  })
}, Promise.resolve())
// 简写
myPromises.reduce((previousPromise, nextPromise) => previousPromise.then(() => nextPromise()), Promise.resolve())

// 更加简化
async function runPromises(myPromises) {
  for (let promise of myPromises) {
    await promise()
  }
}
```

