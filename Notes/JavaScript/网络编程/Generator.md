# Generator



> [Generator - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)



## 定义

- \>=ES6
- 一种异步编程解决方案
- 内部可以封装多个状态
- 可以理解为一个状态机



## 基本格式

> [function* - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

- 在普通函数的 `function` 后面加上 `*`

```js
function* demo() {}
```



## 返回值

- 无论 `Generator函数` 有没有返回值, 都会返回一个 `Iterator` 对象

```js
function* test() {
  return "aaa";
}

let it = test();
console.log(it); // it {<suspended>}
```





## 不会立即执行

- 调用 `Generator函数` 后, 函数中封装的代码不会立即被执行

```js
function* test() {
  console.log("123");
}

test(); // 无输出
```



## `yield` 关键字

> [yield - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)

- 只能在 `Generator函数` 中使用
- 用来定义状态
- 可以让 `Generator函数` 内部的逻辑切割成多个部分, 每一个 `yield` 和其之前的, 上一个 `yield` 之后的代码是一个部分
- t通过调用返回的 `Iterator` 对象的 `next` 方法, 就可以执行一个部分的代码
- 执行哪个部分, 就会返回哪个部分定义的状态

- 调用 `next` 方法的时候可以传递一个参数, 会传递给上一个 `yield`

```js
function* test() {
  console.log("123");
  let res = yield "aaa";
  console.log(res);
  console.log("456");
  yield 1 + 1;
  console.log("789");
  yield true;
}

let it = test()
console.log(it.next()); // 123 (执行结果), {value: "aaa", done: false} (next方法返回的值)
console.log(it.next("Tony666")); // Tony666, 456 (执行结果), {value: 2, done: false} (next方法返回的值)
console.log(it.next()); // 789 (执行结果), {value: true, done: false} (next方法返回的值)
console.log(it.next()); // {value: undefined, done: true} (next方法返回的值, 已经迭代完毕)
```

