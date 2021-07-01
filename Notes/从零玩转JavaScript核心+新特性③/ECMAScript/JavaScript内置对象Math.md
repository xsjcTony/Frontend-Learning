# Math



## MDN官方文档

> [Math - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)



## 常用方法 (Methods)



### `Math.floor()`



> [Math.floor() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)



#### 作用

- 向下取整



#### 格式

```js
Math.floor(x)
```



#### 参数

- `x` : 一个 `Number`



#### 返回值

- `<=x` 的最大的 `整数` , 如果 `x` 缺失或 `NaN` 则返回 `NaN` , `null` 则返回 `0`



#### 示例

```js
let num1 = 3;
let num2 = 3.1;
let num3 = 3.9;
console.log(Math.floor(num1)); // 3
console.log(Math.floor(num2)); // 3
console.log(Math.floor(num3)); // 3

console.log(Math.ronud()); // NaN
console.log(Math.round(NaN)); // NaN
console.log(Math.round((null)); // 0
```



### `Math.ceil()`



> [Math.ceil() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)



#### 作用

- 向上取整



#### 格式

```js
Math.ceil(x)
```



#### 参数

- `x` : 一个 `Number`



#### 返回值

- `>=x` 的最小的 `整数` , 如果 `x` 缺失或 `NaN` 则返回 `NaN` , `null` 则返回 `0`



#### 示例

```js
let num1 = 4;
let num2 = 3.1;
let num3 = 3.9;
console.log(Math.ceil(num1)); // 4
console.log(Math.ceil(num2)); // 4
console.log(Math.ceil(num3)); // 4

console.log(Math.ceil()); // NaN
console.log(Math.ceil(NaN)); // NaN
console.log(Math.ceil(null)); // 0
```



### `Math.round()`



> [Math.round() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)



#### 作用

- 四舍五入



#### 格式

```js
Math.round(x)
```



#### 参数

- `x` : 一个 `Number`



#### 返回值

- 四舍五入后的 `整数` , 如果 `x` 缺失或 `NaN` 则返回 `NaN` , `null` 则返回 `0`



#### 示例

```js
let num1 = 3;
let num2 = 3.1;
let num3 = 3.5
let num4 = 3.9;
console.log(Math.round(num1)); // 3
console.log(Math.round(num2)); // 3
console.log(Math.round(num3)); // 4
console.log(Math.round(num4)); // 4

console.log(Math.round()); // NaN
console.log(Math.round(NaN)); // NaN
console.log(Math.round(null)); // 0
```



### `Math.abs()`



> [Math.abs() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)



#### 作用

- 绝对值



#### 格式

```js
Math.abs(x)
```



#### 参数

- `x` : 一个 `Number`



#### 返回值

- `x` 的绝对值, 若 `x` 为 `NaN` 则返回 `NaN` , `null` 则返回 `0`



#### 示例

```js
let num1 = 3;
let num2 = -3;
console.log(Math.abs(num1)); // 3
console.log(Math.abs(num2)); // 3

console.log(Math.round()); // NaN
console.log(Math.round(NaN)); // NaN
console.log(Math.round(null)); // 0
```



### `Math.random()`



> [Math.random() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)



作用

- 生成 `0` (包括) 到 `1` (不包括) 之间的伪随机数



格式

```js
Math.random()
```



返回值

- 一个 `Floating Point` ,  `0` (包括) 到 `1` (不包括) 之间的伪随机数



示例

```js
console.log(Math.random()); // 0.15358706926636634
console.log(Math.random()); // 0.2911441968882471
console.log(Math.random()); // 0.39131023666277076
```



### `Math.min()`



> [Math.min() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)



作用

- 取最小值



格式

```js
Math.min()
Math.min(value0)
Math.min(value0, value1)
Math.min(value0, value1, ... , valueN)
```



参数

- `value1, value2, ...` : 一堆数

    

返回值

- 参数中最小的数



示例

```js
console.log(Math.min(2, 3, 1)); // 1

console.log(Math.min(-2, -3.3, -1)); // -3.3

const array1 = [2, 3, 1];

console.log(Math.min(...array1)); // 1
```

















