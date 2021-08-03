# 数据类型 (Data Type)

## 分类 (Classify)

| JavaScript数据类型分类 | 英文 / English | 基本 / 引用 | Primitive / Reference |
| ---------------------- | -------------- | ----------- | --------------------- |
| 数值                   | Number         | 基本        | Primitive             |
| 字符串                 | String         | 基本        | Primitive             |
| 布尔                   | Boolean        | 基本        | Primitive             |
| 未定义                 | Undefined      | 基本        | Primitive             |
| 空值                   | Null           | 基本        | Primitive             |
| 对象                   | Object         | 引用        | Reference             |

---

## 检测数据类型 (Distinguish data type)

JavaScript提供了一个名称叫做 `typeof` 的操作符, 用来检测某一个数据是属于哪种数据类型的

格式

```js
let res;
res = typeof 123; // 利用typeof检测123的数据类型, 并保存到res这个变量中
console.log(res); // 输出number
```

---

## 数值 (Number)



### 定义

在JavaScript中, 整数 (integer) 和小数 (floating point) 都是数值类型



### 数据类型转换为数值

#### `Number(value)`

##### 格式

- `Number(value)`

```js
// String to Number
let str = "123";
console.log(str); // 输出123
console.log(typeof str); // 输出string
let num = Number(str); // 根据传入的数据重新生成一个新的数值
console.log(num); // 输出123
console.log(typeof num); // 输出number

// Constant to Number
let num = Number("456");
console.log(num); // 输出456
console.log(typeof num); // 输出number
```

##### 注意点

- 如果字符串中没有数据或者由 `空格` 组成, 那么转换的结果是 `0`

```js
let str = "";
// let str = "     ";
let num = Number(str);
console.log(num); // 输出0
console.log(typeof num); // 输出number
```

- 如果字符串中不仅仅有数值, 那么转换的结果是 `NaN` , `NaN === Not a Number`

```js
let str = "12px";
let num = Number(str);
console.log(num); // 输出NaN
console.log(typeof num); // 输出number
```

- 布尔类型的 `true` 转换结果是 `1`, `false` 的转换结果是 `0`

```js
// Boolean to Number
let flag = true;
let num = Number(flag);
console.log(num); // 输出1
console.log(typeof num); // 输出number

let flag = false;
let num = Number(flag);
console.log(num); // 输出0
console.log(typeof num); // 输出number
```

- 空类型的转换结果是 `0`

```js
// Null to Number
let value = null;
let num = Number(value);
console.log(num); // 输出0
console.log(typeof num); // 输出number
```

- 未定义类型的转换结果是 `NaN`

```js
// Undefined to Number
let value = undefined;
let num = Number(value);
console.log(num); // 输出NaN
console.log(typeof num); // 输出number
```

##### 总结

- 空字符串 / `false` / `null` 转换为 `0`
- 字符串中不仅仅有数值 / `undefined` 转换为 `NaN`
- 其他的正常转换



#### `+value` / `-value`

##### 格式

- `+value`

- `-value`

```js
let str = "123";
let num1 = +str;
let num2 = -str;
console.log(num1); // 输出123
console.log(num2); // 输出-123
console.log(typeof num1); // 输出number
console.log(typeof num2); // 输出number
```

##### 注意点

- `-value` 会改变数值的正负性
- 本质上就是调用了 `Number(value)` 函数, 所以同 [`Number(value)`](####Number(value))



#### `parseInt(value)` / `parseFloat(value)`

##### 格式

- `parseInt(value)`

- `parseFloat(value)`

```js
let str = "3.14px";
let num1 = parseInt(str);
let num2 = parseFloat(str);
console.log(num1); // 输出3
console.log(num2); // 输出3.14
console.log(typeof num1); // 输出number
console.log(typeof num2); // 输出number
```

##### 注意点

- 从左至右提取数值, 一旦遇到非数值就会立即停止, 停止的时候如果还没有提取到数值就返回 `NaN`

```js
let str = "a3.14px";
let num = parseFloat(str);
console.log(num); // 输出NaN
console.log(typeof num); // 输出number
```

- 会将传入的数据一律当做字符串处理

```js
let flag = true;
let num1 = Number(flag);
let num2 = parseInt(flag); // parseInt("true"), Boolean true 变成了 String "true"
console.log(num1); // 输出1
console.log(num2); // 输出NaN
console.log(typeof num1); // 输出number
console.log(typeof num2); // 输出number
```

---

## 字符串 (String)



### 定义

在JavaScript中, 被 `''` 和 `""` 和 <span style="color: yellow">` `` ` (>=ES6)</span> 括起来的内容都是字符串类型




### 注意点

- 被 ` `` ` 括起来的 `String` 可以是多行的

    ```js
    let str = `<ul>
      <li>1</li>
      <li>2</li>
    </ul>`;
    console.log(str);
    ```

- 被 ` `` ` 括起来的 `String` 中可以直接使用 `${}` 插入变量数值

    ```js
    let name1 = "Tony";
    let name2 = "Lily";
    let str = `${name1} loves ${name2}.`;
    console.log(str); // "Tony loves Lily."
    ```

- 尽量避免多拼接 `String` , 因为会占用过多的内存空间

- 实质上是 `new String(str)`

    ```js
    let str = "Tony loves Lily"; // let str = new String("Tony loves Lily");
    console.log(str.length); 
    ```

    



### 数据类型转换为字符串

#### `value.toString()`

##### 格式

-  `value.toString()`


```js
// Number to String
let value = 123;
console.log(value); // 在Chrome控制台中Number类型默认显示为蓝色
console.log(typeof value); // 输出number
let str = value.toString(); // 将value中的数据拷贝一份, 然后将拷贝的数据转换为String之后返回
console.log(str); // 在Chrome控制台中String类型默认显示为黑色
console.log(typeof str); // 输出string

// Boolean to String
let value = true;
console.log(value); // 在Chrome控制台中Boolean类型默认显示为蓝色
console.log(typeof value); // 输出boolean
let str = value.toString();
console.log(str);
console.log(typeof str); // 输出string
```

##### 注意点

- toString()是对拷贝的数据进行转换, 不会影响到原数据

```js
let value = 123;
let str = value.toString();
console.log(value); // 输出123
console.log(typeof value); // 输出number
```

- 不能使用常量直接调用 `toString()` 方法, 因为常量是不能改变的

```js
let str = 123.toString(); // 会明确报错
```

- 不能通过 `toString()` 把Undefined和Null转换为String
- 本质是拷贝然后转换, 不是新建



#### `String(value)`

##### 格式

- `String(value)`

```js
// Undefined to String
let value = undefined;
console.log(value); // 输出undefined(灰色数值)
console.log(typeof value); // 输出undefined(黑色数据类型)
let str = String(value); // 根据传入的数据重新生成一个新的字符串
console.log(str); // 输出undefined(字符串类型的数值)
console.log(typeof str); // 输出string

// Null to String
let value = null;
console.log(value); // 输出null(灰色数值)
console.log(typeof value); // 输出object(黑色数据类型)
let str = String(value);
console.log(str); // 输出null(字符串类型的数值)
console.log(typeof str); // 输出string

// 常量 to String
let str = String(123);
console.log(str); // 输出123(字符串类型的数值)
console.log(typeof str); // 输出string
```

##### 注意点

- 常量, Number, Boolean, Undefined, Null 都可以通过 `String(value)` 的方式转换成String
- 本质是根据数值新建, 不是转换



#### `value + ""` / `value + ''`

##### 格式

- `value + ""`

- `value + ''`

```js
let value = 123;
// let str = value + ''; // 单双引号皆可
let str = value + "";
console.log(str); // 输出123
console.log(typeof str); // 输出string
```

##### 注意点

- 本质就是调用 `String()` 函数, 所以同 [`String(value)`](####String(value))



### 字符串方法



#### `String.split()`



> [String.prototype.split() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)



作用

- 分割一个 `String` 并将被分割的 `subString` 存入一个新的 `Array`

格式


- `str.spilt(separator, limit)`

参数

- `separator` : (Optional) 用来分割 `String` 的分割符, 如果省略则返回包括整个 `String` 的 `Array`
- `limit` : (Optional) 一个非负整数, 指定返回的 `Array` 中的最多项数. 如果为 `0` 则返回 `[]`

返回值

- 按照 `separator` 分割的包含所有 `subString` 的 `Array`

示例

```js
let str = "1,2,3";
let res = str.spilt(",")
console.log(res); // ["1", "2", "3"]
```



#### `String.length`



> [String length - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)



作用

- 返回一个 `String` 的长度, 为 `read-only` 的 `Property` , 不是 `Method`



#### `String.charAt()`



> [String.prototype.charAt() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)



作用

- 返回一个包含指定单个 `UTF-16` 编码单位的新 `String`

格式


- `str.charAt(index)`

参数

- `index` : 索引位置, 必须是整数. 如果传入了非法参数或者没有提供, 则默认为 `0`

返回值

- 包含在索引位置的单个 `UTF-16` 编码单位的新 `String` , 若 `index` 超出 `String` 的长度, 则返回空 `String

示例

```js
// index   0123
let str = "abcd";
let ch1 = str[1]; // 相同用法, 但低级浏览器不兼容
let ch2 = str.charAt(1);
console.log(ch1); 
console.log(ch2);
```



#### `String.indexOf()`



> [String.prototype.indexOf() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)



作用

- 从左至右查找指定 `character` 在 `String` 中的位置

格式

- `str.indexOf(character, fromIndex)`

参数

- `character` : 想要查找的 `character`
- `fromIndex` : (Optional) 开始进行查找的索引位置, 默认为 `0`

返回值

- 指定 `character` 第一次出现的 `index` 数, 如果不存在会返回 `-1`

示例

```js
// index   012345
let str = "cvavcd";
let index = str.indexOf("v");
console.log(index); // 1
```



#### `String.lastIndexOf()`



> [String.prototype.lastIndexOf() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)



作用

- 从右至左查找指定 `character` 在 `String` 中的位置

格式

- `str.lastIndexOf(element, fromIndex)`

参数

- `element` : 想要查找的 `character`
- `fromIndex` : (Optional) 开始进行查找的索引位置, 默认为 `+Infinity`

返回值

- 指定 `character` 最后一次出现的 `index` 数, 如果不存在会返回 `-1`

示例

```js
// index   012345
let str = "cvavcd";
let index = str.lastIndexOf("v");
console.log(index); // 3
```



#### `String.includes()`



> [String.prototype.includes() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)



作用

- 查找 `String` 中是否存在 指定 `String` , `case-sensitive`

格式

- `str.includes(string, fromIndex)`

参数

- `string` : 想要查找的 `String`
- `fromIndex` : (Optional) 开始进行查找的索引位置, 默认为 `0`

返回值

- 指定 `String` 存在则返回 `true` , 不存在则返回 `false`

示例

```js
let str = "I am Tony";
let res1 = str.includes("am");
let res2 = str.includes("Am");
console.log(res1); // true
console.log(res2); // false
```



#### <span style="color: red"><不推荐></span> `Array.concat()`



> [Array.prototype.concat() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)



作用

- 合并两个或多个 `String`

格式

- `str.concat(str2)`

参数

`string` : (Optional) 将要合并的 `String`

返回值

- 一个新的合并后的 `String` , 不会修改原来的 `String` , 如果 `string` 参数省略, 则返回当前 `String` 的复制品

示例

```js
let str = "Tony";
let str2 = " loves";
let str3 = " Lily";
console.log(str.concat(str2, str3)); // "Tony loves Lily"
console.log(str + str2 + str3); // 推荐使用
```



#### `String.substring()`



> [String.prototype.substring() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)



作用

- 截取 `String` 中指定范围中的内容并放在一个新的 `String` 中

格式

- `str.substring(start, end);`

参数

- `start` : 索引起始位置 (包含)
- `end` : 索引结束为止 (不包含)

返回值

- 一个包含提取出的数据的新 `String`

示例

```js
// index   012345
let str = "abcdef";
let subStr = str.substring(1, 3);
console.log(subStr); // "bc"
```



#### `String.substr()`



> [String.prototype.substr() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)



作用

- 截取 `String` 中指定范围中的内容并放在一个新的 `String` 中

格式

- `str.substring(start, length);`

参数

- `start` : 索引起始位置 (包含)
- `length` : 截取的长度

返回值

- 一个包含提取出的数据的新 `String`

示例

```js
// index   012345
let str = "abcdef";
let subStr = str.substr(1, 3);
console.log(subStr); // "bcd"
```



#### `String.startsWith()`



> [String.prototype.startsWith() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)



作用

- 判断 `String` 是否由指定的 `characters` 开头

格式

```js
startsWith(searchString)
startsWith(searchString, position)
```

参数

- `searchString` : 指定在开头的 `characters`
- `position` : (Optional) 开始进行查找的索引位置, 默认为 `0`

返回值

- 若指定 `characters` 在开头找到, 则返回 `true` , 否则返回 `0`

示例

```js
let str = "Tony loves Lily.";
let result1 = str.startsWith("Tony l");
let result2 = str.startsWith("tony");
console.log(result1); // true
console.log(result2); // false
```



#### `String.endsWith()`



> [String.prototype.endsWith() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)



作用

- 判断 `String` 是否由指定的 `characters` 结尾

格式

```js
endsWith(searchString)
endsWith(searchString, length)
```

参数

- `searchString` : 指定在结尾的 `characters`
- `length` : (Optional) 查找 `String` 的长度, 默认为 `str.length`

返回值

- 若指定 `characters` 在结尾找到, 则返回 `true` , 否则返回 `0`

示例

```js
let str = "Tony loves Lily!"
let result1 = str.endsWith("y!");
let result2 = str.endsWith("Lily");
let result3 = str.endsWith("Lily", str.length - 1);
console.log(result1); // true
console.log(result2); // false
console.log(result3); // true
```



#### `String.replace()`



> [String.prototype.replace() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)



作用

- 返回一个由 `replacement` 替换所有 `pattern` 的新 `String`

格式

```js
replace(regexp, newSubstr)
replace(regexp, replacerFunction)

replace(substr, newSubstr)
replace(substr, replacerFunction)
```

参数

- `regexp` (pattern) : 一段 `Regex` 表达式, 所有满足条件的 `pattern` 都会被 `replacement` 替换
- `substr` : 一段 `String` , 第一个相同的部分会被 `replacement` 替换
- `newSubstr` (replacement) : 替换所有的 `pattern`
- `replacerFunction` (replacement) : 使用 `Function` 生成替换所有 `pattern` 的 `String`

返回值

- 替换过后的新 `String`

示例

```js
let str = "abc";
let newStr = str.replace("b", "m");
console.log(str); // "abc"
console.log(newStr); // "amc"
```





---

## 布尔 (Boolean)



### 定义

在JavaScript中, 只有 `True` 和 `False` 是布尔类型



### 数据类型转换为布尔

#### `Boolean(value)`

##### 格式

- `Boolean(value)`

```js
let str = "abc";
let flag = Boolean(str); // 根据传入的数据重新生成一个新的布尔
console.log(flag); // 输出true
console.log(typeof flag); // 输出boolean
```

##### 注意点

- 字符串中只要有内容就会转换为 `true` , 字符串中没有内容就换转换为 `false`

```js
// String to Boolean
let str1 = "abc";
let str2 = "     ";
let str3 = "";
let flag1 = Boolean(str1);
let flag2 = Boolean(str2);
let flag3 = Boolean(str3);
console.log(flag1); // 输出true
console.log(flag2); // 输出true
console.log(flag3); // 输出false
console.log(typeof flag1); // 输出boolean
console.log(typeof flag2); // 输出boolean
console.log(typeof flag3); // 输出boolean
```

- 只有数值是 `0` 才会转换为 `false` , 其他数值都会转换为 `true`

```js
// Number to Boolean
let num1 = 999;
let num2 = -123;
let num3 = -0;
let num4 = 0;
let flag1 = Boolean(num1);
let flag2 = Boolean(num2);
let flag3 = Boolean(num3);
let flag4 = Boolean(num4);
console.log(flag1); // 输出true
console.log(flag2); // 输出true
console.log(flag3); // 输出false
console.log(flag4); // 输出false
console.log(typeof flag1); // 输出boolean
console.log(typeof flag2); // 输出boolean
console.log(typeof flag3); // 输出boolean
console.log(typeof flag4); // 输出boolean
```

- `NaN` 数值也会转换为 `false`

```js
let num = NaN;
let flag = Boolean(num);
console.log(flag); // 输出false
console.log(typeof flag); // 输出boolean
```

- 空类型会转换为 `false`

```js
let value = null;
let flag = Boolean(value);
console.log(flag); // 输出false
console.log(typeof flag); // 输出boolean
```

- 未定义类型会转换为 `false`

```js
let value = undefined;
let flag = Boolean(value);
console.log(flag); // 输出false
console.log(typeof flag); // 输出boolean
```

##### 总结

- 空字符串 / `0` / `NaN` / `undefined` / `null` 会转换为 `false`
- 其他的换转换为 `true`

---

## 未定义 (Undefined)



### 定义

在JavaScript中, 只有 `undefined` 属于未定义类型

---

## 空 (Null)



---

## 对象 (Object)



---

## 注意点 (Notes)



### Undefined易混淆

`undefined` 数值和 **undefined** 数据类型是两个东西, `undefined` 类型的数值在Chrome控制台中默认显示为<span style="color: grey;">灰色</span>, 数据类型默认显示为<span style="color: #000000">黑色</span>

```js
let num;
// 以下代码的含义是输出num变量中保存的数据
// 由于没有初始化num, 所以变量中的数据默认是undefined
console.log(num); // 输出undefined(数值)
// 利用typeof检查num中保存的数据是什么类型的, 就是用typeof检查undefined
let res = typeof num;
console.log(res); // 输出undefined(数据类型)
```



### NaN属于Number类型

在JavaScript中, `NaN` 是属于Number类型的

```js
let num = NaN;
console.log(typeof num); // 输出number
```



### Chrome控制台不同数据类型的数值显示的颜色

| 数据类型 / Data type             | 颜色 / Color                                   |
| -------------------------------- | ---------------------------------------------- |
| 数值 / Number                    | <span style="color: blue">蓝色 / Blue</span>   |
| 字符串 / String                  | <span style="color: black">黑色 / Black</span> |
| 布尔 / Boolean                   | <span style="color: blue">蓝色 / Blue</span>   |
| 未定义 / Undefined               | <span style="color: grey">灰色 / Grey</span>   |
| 空 / Null                        | <span style="color: grey">灰色 / Grey</span>   |
| 数据类型名称 / Name of data type | <span style="color: black">黑色 / Black</span> |

