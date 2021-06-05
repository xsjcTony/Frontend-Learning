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

- `arr.length` 表示数组的size

```js
for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
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

## 数组函数 (Array functions)



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
- `fromIndex` : 开始进行查找的索引位置, 默认为 `0`

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
- `fromIndex` : 开始进行查找的索引位置, 默认为 `Array.length - 1`

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
- `fromIndex` : 开始进行查找的索引位置, 默认为 `0`

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





