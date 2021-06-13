# 数组 (Array)



> [Array - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)



## 定义

专门用于存储一组数据, 是对象类型 (引用数据类型)



## 格式

### 创建数组

- 推荐使用: `let arr = [];`

- `let arr = new Array(size);`

```js
let arr = new Array(3); // 能够存储3个数据的数组
```

### 存储数据

- `arr[index] = value;`

```js
let arr = new Array(3);
console.log(arr); // [empty × 3]
arr[0] = "data"; // index is integer starting from 0 to (size - 1)
console.log(arr); // ["data", empty × 2]
```

### 获取数据

- `arr[index]`

```js
let arr = new Array(3);
console.log(arr); // [empty × 3]
arr[0] = "data";
arr[1] = "data2";
console.log(arr); // ["data", "data2", empty]
console.log(arr[0]); // data
```

## 注意点

- 如果对应的 `index` 中没有存储数据, 默认存储的是 `undefined` , <span style="color: red">其他编程语言默认储存的是 `垃圾数据` 或 `0` </span>

	```js
	let arr = new Array(3);
	console.log(arr[0]); // undefined
	```

- 访问不存在的 `index` 不会报错, 会返回 `undefined`, <span style="color: red">其他编程会 `报错` 或返回 `脏数据` </span>

	```js
	let arr = new Array(3);
	console.log(arr[666]); // undefined
	```

- `Array` 存储空间不够的时候会自动扩容, <span style="color: red">其他编程语言不会</span>

	```js
	let arr = new Array(3);
	arr[0] = "data";
	arr[1] = "data2";
	arr[2] = "data3";
	arr[3] = "the 4th data"; // exceed the size at initialization
	console.log(arr); // ["data", "data2", "data3", "the 4th data"]
	```

- 可以存储不同类型的数据, <span style="color: red">其他编程语言只能存储相同类型的数据</span>

	```js
	let arr = new Array(4);
	arr[0] = 123; // Number
	arr[1] = "123"; // String
	arr[2] = true; // Boolean
	arr[3] = null; // Null
	console.log(arr); // [123, "123", true, null]
	```

- `Array` 分配的存储空间不一定是连续的, 采用 `Hash map` , 浏览器的优化会尽量给相同类型的数据分配连续的存储空间, <span style="color: red">其他编程语言都是连续的</span>

- 其他创建 `Array` 的方式

	```js
	// via function
	let arr = new Array(size); // 创建一个指定size大小的数组
	let arr = new Array(); // 创建一个空数组
	let arr = new Array(data1, data2, .....); // 创建一个带数据的数组
	
	// via literal
	let arr = [];
	let arr = [data1, data2, .....];
	```

---

## 遍历 (Traversal)



### 定义

依次取出数组中所有存储的数据



### 格式



#### `for` 循环

- `arr.length` 表示数组的size

```js
for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```



#### `for of` 循环 <span style="color: yellow">(>=ES6)</span>

```js
for(let value of arr) {
  console.log(value);
}
```



#### `Array.forEach()`



> [Array.prototype.forEach() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)



##### 作用

- 遍历 `Array` 并针对每一个 `element` 执行传入的 `Function`

##### 格式

```js
// Arrow function
forEach((element) => { ... } )
forEach((element, index) => { ... } )
forEach((element, index, array) => { ... } )

// Callback function
forEach(callbackFn)
forEach(callbackFn, thisArg)

// Inline callback function
forEach(function callbackFn(element) { ... })
forEach(function callbackFn(element, index) { ... })
forEach(function callbackFn(element, index, array) { ... })
forEach(function callbackFn(element, index, array) { ... }, thisArg)
```

##### 参数

- `callbackFn` : 在每个 `element` 上将要执行的 `Function` , 可以包含 `1` 到 `3` 个 `parameter`
    - `element` : 当前遍历至的 `element`
    - `index` : (Optional) 当前遍历至的 `element` 的 `index`
    - `array` : (Optional) 当前调用 `forEach()` 的 `Array`
- `thisArg` : (Optional) 执行 `callbackFn` 的时候使用的 `this` 的数值

##### 返回值

- `undefined`

##### 原理

```js
Array.prototype.myForEach = function (fn) { // this是调用myForEach()的数组
  for(let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
}
```

##### 示例

```js
// index   0  1  2  3  4
let arr = [1, 3, 5, 7, 9]
arr.forEach((element, index, array) => {
  console.log(element, index, array);
});
```

---

## 解构赋值 (Destructuring assignment)



> [Destructuring assignment - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)



### 格式

```js
let arr = [1, 2, 3];
let [a, b, c] = arr;
console.log(a, b, c); // 1, 3, 5
```



### 注意点

- `=` 左边的格式必须和右边的格式一模一样, 才能完全解构

	```js
	let [a, b, [c, d]] = [1, 3, [2, 4]];
	console.log(a, b, c, d); // 1, 3, 2, 4
	```

- `=` 左边的个数可以和右边的个数不一样

	```js
	let [a, b] = [1, 3, 5];
	console.log(a, b); // 1, 3
	```

- `=` 右边的个数可以和左边的个数不一样

	```js
	let [a, b, c] = [1];
	console.log(a, b, c); // 1, undefined, undefined
	```

- 可以给 `=` 左边指定默认值

	```js
	let [a, b = 666, c = 888] = [1];
	console.log(a, b, c); // 1, 666, 888
	```

- 给 `=` 左边指定的默认值会被解构到的数值覆盖

	```js
	let [a, b = 666, c = 888] = [1, 3];
	console.log(a, b, c); /// 1, 3, 888
	```

- 可以使用扩展运算符 `...` 打包剩余的数据 **(>=ES6)**, 并且只能写在最后

	```js
	let [a, ...b] = [1, 3, 5];
	console.log(a, b); // 1, [3, 5]
	```

	> [Spread syntax (...) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
	>
	> [Rest parameters - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

---

## 数组方法 (Array methods)



### `Array.splice()`



> [Array.prototype.splice() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)





#### 作用

- 从 `Array` 的一个位置开始删除并/或添加一些数据

#### 格式

- `arr.splice(start, deleteCount, item1, item2, .....);`

#### 参数

- `start` : 索引起始位置
- `deleteCount` : 删除数据的个数
- `item` : (Optional) 需要添加进 `Array` 的数据

#### 返回值

- 一个包含所有被删除数据的 `Array`

#### 示例

```js
let arr = ["a", "b", "c"];
let res = arr.splice(1, 2, "d", "e");
console.log(arr); // ["a", "d", "e"]
console.log(res); // ["b", "c"]
```



### `Array.push()`



> [Array.prototype.push() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)



#### 作用

- 从 `Array` 末尾添加一个或多个数据

#### 格式

- `arr.push(item1, item2, .....);`

#### 参数

- `item` : 需要添加进 `Array` 的数据

#### 返回值

- 新增内容之后的 `Array` 的长度

#### 示例

```js
let arr = ["a", "b", "c"];
let res = arr.push("d", "e");
console.log(arr); // ["a", "b", "c", "d", "e"]
console.log(res); // 5
```



### `Array.unshift()`



> [Array.prototype.unshift() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)



#### 作用

- 从 `Array` 开始添加一个或多个数据

#### 格式

- `arr.unshift(item1, item2, .....);`

#### 参数

- `item` : 需要添加进 `Array` 的数据

#### 返回值

- 新增内容之后的 `Array` 的长度

#### 示例

```js
let arr = ["a", "b", "c"];
let res = arr.push("d", "e");
console.log(arr); // ["d", "e", "a", "b", "c"]
console.log(res); // 5
```



### `Array.pop()`



> [Array.prototype.pop() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)



#### 作用

- 删除 `Array` 中的最后一个数据

#### 格式

- `arr.pop();`

#### 返回值

- 被删除的数据

#### 示例

```js
let arr = ["a", "b", "c"];
let res = arr.pop();
console.log(arr); // ["a", "b"]
console.log(res); // c
```



### `Array.shift()`



> [Array.prototype.shift() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)



#### 作用

- 删除 `Array` 中的第一个数据

#### 格式

- `arr.shift();`

#### 返回值

- 被删除的数据

#### 示例

```js
let arr = ["a", "b", "c"];
let res = arr.pop();
console.log(arr); // ["b", "c"]
console.log(res); // a
```



### `Array.toString()`



> [Array.prototype.toString() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)



#### 作用

- 将 `Array` 转换为 `String`

#### 格式

- `arr.toString();`

#### 返回值

- 表示数组内容的 `String`

#### 示例

```js
let arr = ["a", "b", "c"];
let str = arr.toString();
console.log(res); // "a,b,c"
```



### `Array.join()`



> [Array.prototype.join() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)



#### 作用

- 将 `Array` 通过指定的连接符转换为 `String`

#### 格式

- `arr.join();`
- `arr.join(separator);`

#### 参数

- `separator` : (Optional) 连接符

#### 返回值

- 表示数组内容的 `String` , 如果是 `undefined` / `null` / 空 `Array` 则返回空 `String`

#### 示例

```js
let arr = ["a", "b", "c"];
let str = arr.join("+");
console.log(res); // "a+b+c"
```



### `Array.concat()`



> [Array.prototype.concat() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)



#### 作用

- 合并两个或多个 `Array`

#### 格式

- `arr.concat(arr2);`

#### 参数

`array` : (Optional) 将要合并的 `Array`

#### 返回值

- 一个新的合并后的 `Array` , 不会修改原来的 `Array` , 如果 `array` 参数省略, 则返回当前 `Array` 的复制品

#### 示例

```js
let arr = [1, 3, 5];
let arr2 = [2, 4, 6]
let res = arr.concat(arr2);
console.log(res); // [1, 3, 5, 2, 4, 6]
console.log(arr); // [1, 3, 5]
console.log(arr2); // [2, 4, 6]
```



### `Array.reverse()`



> [Array.prototype.reverse() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)



#### 作用

- 反转 `Array` 的内容

#### 格式

- `arr.reverse();`

#### 返回值

- 反转后的 `Array`

#### 示例

```js
let arr = [1, 2, 3, 4, 5];
let res = arr.reverse();
console.log(res); // [1, 2, 3, 4, 5]
console.log(arr); // [5, 4, 3, 2, 1]
```



### `Array.slice()`



> [Array.prototype.slice() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)



#### 作用

- 截取 `Array` 中指定范围中的内容并放在一个新的 `Array` 中

#### 格式

- `arr.slice(start, end);`

#### 参数

- `start` : 索引起始位置 (包含)
- `end` : 索引结束为止 (不包含)

#### 返回值

- 一个包含提取出的数据的新 `Array`

#### 示例

```js
// index   0  1  2  3  4
let arr = [1, 2, 3, 4, 5];
let res = arr.slice(1, 3);
console.log(res); // [1, 2]
console.log(arr); // [1, 2, 3, 4, 5]
```



### `Array.indexOf()`



> [Array.prototype.indexOf() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)



#### 作用

- 从左至右查找元素在 `Array` 中的位置

#### 格式

- `arr.indexOf(element, fromIndex);`

#### 参数

- `element` : 想要查找的元素
- `fromIndex` : (Optional) 开始进行查找的索引位置, 默认为 `0`

#### 返回值

- 元素第一次出现的 `index` 数, 如果元素不存在会返回 `-1`

#### 示例

```js
// index   0  1  2  3  4  5
let arr = [1, 2, 3, 4, 5, 3];
let res1 = arr.indexOf(3)
let res2 = arr.indexOf(6);
console.log(res1); // 2
console.log(res2); // -1
```



### `Array.lastIndexOf()`



> [Array.prototype.lastIndexOf() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)



#### 作用

- 从右至左查找元素在 `Array` 中的位置

#### 格式

- `arr.lastIndexOf(element, fromIndex);`

#### 参数

- `element` : 想要查找的元素
- `fromIndex` : (Optional) 开始进行查找的索引位置, 默认为 `Array.length - 1`

#### 返回值

- `Array` 中元素最后一次出现的 `index` 数, 如果元素不存在会返回 `-1`

#### 示例

```js
// index   0  1  2  3  4  5
let arr = [1, 2, 3, 4, 5, 3];
let res = arr.lastIndexOf(3)
console.log(res); // 5
```



### `Array.includes()`



> [Array.prototype.indexOf() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)



#### 作用

- 查找元素是否在 `Array` 中存在

#### 格式

- `arr.includes(element, fromIndex);`

#### 参数

- `element` : 想要查找的元素
- `fromIndex` : (Optional) 开始进行查找的索引位置, 默认为 `0`

#### 返回值

- 元素存在则返回 `true` , 不存在则返回 `false`

#### 示例

```js
// index   0  1  2  3  4  5
let arr = [1, 2, 3, 4, 5, 3];
let res1 = arr.indexOf(3)
let res2 = arr.indexOf(6);
console.log(res1); // 2
console.log(res2); // -1
```



### `Array.fill()`



> [Array.prototype.fill() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)



#### 作用

- 把所有的元素变成一个数值

#### 格式

- `arr.fill(start, end);`

#### 参数

- `value` : 替换的值
- `start` : (Optional) 开始进行替换的索引位置, 默认为 `0` (包含)
- `end` : (Optional) 结束替换的索引位置, 默认为 `Array.length - 1` (不包含)

#### 返回值

- 编辑过后的 `Array` 

#### 示例

```js
let arr = [1, 2, 3, 4, 5];
let res = arr.fill(0, 2, 4);
console.log(res); // [1, 2, 0, 0, 5]
console.log(arr); // [1, 2, 0, 0, 5]
```



### `Array.findIndex()`



> [Array.prototype.findIndex() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)



#### 作用

- 返回 `Array` 中满足传入的 `Function` 条件的第一个 `element` 的 `index` (从左至右)

#### 格式

```js
// Arrow function
findIndex((element) => { ... } )
findIndex((element, index) => { ... } )
findIndex((element, index, array) => { ... } )

// Callback function
findIndex(callbackFn)
findIndex(callbackFn, thisArg)

// Inline callback function
findIndex(function callbackFn(element) { ... })
findIndex(function callbackFn(element, index) { ... })
findIndex(function callbackFn(element, index, array){ ... })
findIndex(function callbackFn(element, index, array) { ... }, thisArg)
```

#### 参数

- `callbackFn` : 在每个 `element` 上将要执行的 `Function` , 条件满足返回 `true` , 否则返回 `false` , 可以包含 `1` 到 `3` 个 `parameter`
    - `element` : 当前遍历至的 `element`
    - `index` : (Optional) 当前遍历至的 `element` 的 `index`
    - `array` : (Optional) 当前调用 `forEach()` 的 `Array`
- `thisArg` : (Optional) 执行 `callbackFn` 的时候使用的 `this` 的数值

#### 返回值

- 从左至右第一个满足传入的 `Function` 条件的 `element` 的 `index` , 如没有满足条件的则返回 `-1`

#### 原理

```js
Array.prototype.myFindIndex = function (fn) { // this是调用myFindIndex()的数组
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      return i;
    }
  }
  return -1;
}
```

#### 示例

```js
// index   0  1  2  3  4
let arr = [3, 2, 6, 7, 6]
let index = arr.findIndex((element) => {
  if(element === 6) {
    return true;
  }
  return false;
});
console.log(index); // 2
```



### `Array.find()`



> [Array.prototype.find() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)



#### 作用

- 返回 `Array` 中满足传入的 `Function` 条件的第一个 `element` 的 `value` (从左至右)

#### 格式

```js
// Arrow function
find((element) => { ... } )
find((element, index) => { ... } )
find((element, index, array) => { ... } )

// Callback function
find(callbackFn)
find(callbackFn, thisArg)

// Inline callback function
find(function callbackFn(element) { ... })
find(function callbackFn(element, index) { ... })
find(function callbackFn(element, index, array){ ... })
find(function callbackFn(element, index, array) { ... }, thisArg)
```

#### 参数

- `callbackFn` : 在每个 `element` 上将要执行的 `Function` , 条件满足返回 `true` , 否则返回 `false` , 可以包含 `1` 到 `3` 个 `parameter`
    - `element` : 当前遍历至的 `element`
    - `index` : (Optional) 当前遍历至的 `element` 的 `index`
    - `array` : (Optional) 当前调用 `forEach()` 的 `Array`
- `thisArg` : (Optional) 执行 `callbackFn` 的时候使用的 `this` 的数值

#### 返回值

- 从左至右第一个满足传入的 `Function` 条件的 `element` 的 `value` , 如没有满足条件的则返回 `undefined`

#### 原理

```js
Array.prototype.myFind = function (fn) { // this是调用myFind()的数组
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
}
```

#### 示例

```js
// index   0  1  2  3  4
let arr = [3, 2, 6, 7, 6]
let value = arr.find((element) => {
  if(element === 6) {
    return true;
  }
  return false;
});
console.log(value); // 6
```



### `Array.filter()`



> [Array.prototype.filter() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)



#### 作用

- 创建一个新的 `Array` , 包含原 `Array` 中满足传入的 `Function` 条件的所有 `element`

#### 格式

```js
// Arrow function
filter((element) => { ... } )
filter((element, index) => { ... } )
filter((element, index, array) => { ... } )

// Callback function
filter(callbackFn)
filter(callbackFn, thisArg)

// Inline callback function
filter(function callbackFn(element) { ... })
filter(function callbackFn(element, index) { ... })
filter(function callbackFn(element, index, array){ ... })
filter(function callbackFn(element, index, array) { ... }, thisArg)
```

#### 参数

- `callbackFn` : 在每个 `element` 上将要执行的 `Function` , 条件满足返回 `true` , 否则返回 `false` , 可以包含 `1` 到 `3` 个 `parameter`
    - `element` : 当前遍历至的 `element`
    - `index` : (Optional) 当前遍历至的 `element` 的 `index`
    - `array` : (Optional) 当前调用 `forEach()` 的 `Array`
- `thisArg` : (Optional) 执行 `callbackFn` 的时候使用的 `this` 的数值

#### 返回值

- 一个新的 `Array` 包含所有满足传入的 `Function` 条件的 `element` , 若没有满足条件的 `element` , 则返回一个空 `Array`

#### 原理

```js
Array.prototype.myFilter = function (fn) { // this是调用myFind()的数组
  let arr = [];
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
}
```

#### 示例

```js
// index   0  1  2  3  4
let arr = [3, 2, 6, 7, 6]
let res = arr.filter((element) => {
  if(element % 2 === 0) { // element is even number
    return true;
  }
  return false;
});
console.log(res); // [2, 6, 6]
```



### `Array.map()`



> [Array.prototype.map() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)



#### 作用

- 创建一个新的 `Array` , 包含原 `Array` 中所有 `element` 执行传入的 `Function` 之后的结果

#### 格式

```js
// Arrow function
map((element) => { ... } )
map((element, index) => { ... } )
map((element, index, array) => { ... } )

// Callback function
map(callbackFn)
map(callbackFn, thisArg)

// Inline callback function
map(function callbackFn(element) { ... })
map(function callbackFn(element, index) { ... })
map(function callbackFn(element, index, array){ ... })
map(function callbackFn(element, index, array) { ... }, thisArg)
```

#### 参数

- `callbackFn` : 在每个 `element` 上将要执行的 `Function` , 条件满足返回 `true` , 否则返回 `false` , 可以包含 `1` 到 `3` 个 `parameter`
    - `element` : 当前遍历至的 `element`
    - `index` : (Optional) 当前遍历至的 `element` 的 `index`
    - `array` : (Optional) 当前调用 `forEach()` 的 `Array`
- `thisArg` : (Optional) 执行 `callbackFn` 的时候使用的 `this` 的数值

#### 返回值

- 一个新的 `Array` 包含所有 `element` 执行传入的 `Function` 的结果

#### 原理

```js
Array.prototype.myMap = function (fn) { // this是调用myFind()的数组
  let arr = [];
  for(let i = 0; i < this.length; i++) {
    arr.push(fn(this[i], i, this));
  }
  return arr;
}
```

#### 示例

```js
// index   0  1  2  3  4
let arr = [3, 2, 6, 7, 6]
let res = arr.map((element) => {
  if(element % 2 === 0) { // element is even number
    return element;
  }
  return undefined;
});
console.log(res); // [undefined, 2, 6, undefined, 6]
```



### `Array.sort()`



> [Array.prototype.sort() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)



#### 作用

- 对 `Array` 中的 `element` 进行排序, 默认为 `ascending` , 方式是先将 `element` 全部转化为 `String` , 再比较他们的 `UTF-16` 编码

#### 格式

```js
// Functionless
sort()

// Arrow function
sort((firstEl, secondEl) => { ... } )

// Compare function
sort(compareFn)

// Inline compare function
sort(function compareFn(firstEl, secondEl) { ... })
```

#### 参数

- `compareFunction` : (Optional) 决定排序顺序的 `Function` , 接收两个 `parameters` , 如果没有该函数, 则默认按照 `ascending` 排序
    - `firstEl` : 第一个用于比较的 `element`
    - `secondEl` : 第二个用于比较的 `element`

#### 返回值

- 排序后的原 `Array` 

#### 规律

- 如果 `compareFunction(a, b)` 小于 `0` , 那么 `a` 会被排列到 `b` 之前

- 如果 `compareFunction(a, b)` 等于 `0` , `a` 和 `b` 的相对位置不变
- 如果 `compareFunction(a, b)` 大于 `0` , `b` 会被排列到 `a` 之前
- 如果元素是 `String` , 那么比较的是 `String` 的 `UTF-16` 编码
- 如果数组中的元素是 `Number`
    - 如果需要 `ascending` 排序, 那么就返回 `a - b`
    - 如果需要 `descending` 排序, 那么就返回 `b - a`

#### 示例

```js
let arr1 = ["c", "a", "b"];
arr1.sort(); // default ascending order
console.log(arr1) ; // ["a", "b", "c"]
arr1.sort((a, b) => { // descending order
  if(a > b) {
    return -1;
  }
  else if(a < b) {
    return 1;
  }
  else {
    return 0;
  }
});
console.log(arr1); // ["c", "b" ,"a"]


let arr2 = [3, 4, 2, 5, 1];
arr2.sort(); // default ascending order
console.log(arr2); // [1, 2, 3, 4, 5]
arr2.sort((a, b) => { // descending order
  return b - a;
});
console.log(arr2); // [5, 4, 3, 2, 1]


let arr3 = ["1234", "21", "54321", "123", "6"];
arr3.sort((str1, str2) => { // ascending order by string length
  return str1.length - str2.length;
});
console.log(arr3); // ["6", "21", "123", "1234", "54321"]
arr3.sort((str1, str2) => { // descending order by string length
  return str2.length - str1.length;
});
console.log(arr3); // ["54321", "1234", "123", "21", "6"]


let students = [
  {name: "tony", age: 24},
  {name: "lily", age: 18},
  {name: "aelita", age: 21},
  {name: "muxi", age: 16}
];
students.sort((a, b) => { // ascending order by students' age
  return a.age - b.age;
});
console.log(students); // [{name: "muxi", age: 16}, {name: "lily", age: 18}, {name: "aelita", age: 21}, {name: "tony", age: 24}]
students.sort((a, b) => { // ascending order by students' age
  return b.age - a.age;
});
console.log(students); // [{name: "tony", age: 24}, {name: "aelita", age: 21}, {name: "lily", age: 18}, {name: "muxi", age: 16}]
```

---

## 二维数组



### 定义

`Array` 的每一个元素又是 `Array`



### 格式

#### 创建数组

`let arr = [[]];`

#### 存储数据

- `arr[2Dindex]

```js
let arr = [[[], []]];
arr[0] = [1, 3];
console.log(arr); // [[1, 3], []]
arr[1][0] = 2;
console.log(arr); // [[1, 3], [2]]
```

#### 获取数据

- `arr[2Dindex]` 得到一个一维数组
- `arr[2Dindex][1Dindex]` 得到一个一维数组中的元素

```js
let arr = [[1, 3], [2, 4]];
let arr1 = arr[0];
let ele = arr[0][1];
console.log(arr1); // [1, 3]
console.log(ele); // 3
```



#### 遍历

```js
let arr = [[1, 3], [2, 4]];
for(let i = 0; i < arr.length; i++) {
    let subArray = arr[i];
    for(let j = 0; j < subArray.length; j++) {
        console.log(subArray[j]); // 1, 3, 2, 4
    }
}
```

---

## 技巧 (Techniques)



### 清空数组

- `arr = [];`
- `arr.length = 0;`
- `arr.splice(0, arr.length);`



### 合并数组

- `[...arr1, ...arr2]`
	- 扩展运算符 `...` 在 `=` 的左边表示将剩余数据打包成一个新的数组, 在 `=` 的右边表示将数组中的数据解开放到所在的位置



### 遍历并删除所有元素

- ```js
    let arr = [1, 2, 3, 4, 5];
    let length = arr.length; // 5
    for(let i = length - 1; i >= 0; i--) {
      arr.splice(i, 1);
    }
    console.log(arr); // []
    ```

- ```js
    let arr = [1, 2, 3, 4, 5];
    for(let i = 0; i < arr.length; i++) {
      delete arr[i];
    }
    ```

    - 通过 `delete` 删除 `Array` 中的 `element` , `Array` 的 `length` 不会改变







