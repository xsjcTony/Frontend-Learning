# 常量表示一些固定不变的数据 (Constant)



## 分类 (Classify)

| JavaScript中常量的分类 | 描述 / Description          | 英文/ English           |
| ---------------------- | --------------------------- | ----------------------- |
| 整型常量               | 整数                        | Integer constant        |
| 实型常量               | 小数                        | Floating Point constant |
| 字符串常量             | `''` 或者 `""` 括起来的内容 | String constant         |
| 布尔常量               | `True` 或者 `False`         | Boolean constant        |
| 自定义常量             | `const name = value`        | Custom constant         |



## 格式 (Format)

常量数值一旦指定之后无法修改

```javascript
const num = 666;
num = 888; // 尝试修改num的数值
console.log(num); // 输出666
```

---

# 变量表示一些可以改变的数据 (Variable)



## 分类 (Classify)

| JavaScript中变量的分类 | 描述 / Description          | 英文/ English           |
| ---------------------- | --------------------------- | ----------------------- |
| 整型变量               | 整数                        | Integer variable        |
| 实型变量               | 小数                        | Floating Point variable |
| 字符串变量             | `''` 或者 `""` 括起来的内容 | String variable         |
| 布尔变量               | `True` 或者 `False`         | Boolean variable        |
| 自定义变量             | `var name = value`          | Custom variable         |

---

## 基本格式 (Format)



### 定义变量

使用变量就是往申请的那块内存空间中存储数据, 和获取存储的数据. 

```javascript
var num; // 定义一个变量
```



### 存储数据

```javascript
num = 123; // 将数值123存储到变量num的内存空间中
```



### 获取数据

```javascript
console.log(num); // 从变量num的内存空间中取出存储的数值并输出到开发者控制台, 输出123
```



### 修改数据

```javascript
num = 666; // 更改num的数值为666
console.log(num); // 输出更改过后的num的数值666
```

---

## 初始化 (Initialize)



### 定义

第一次给变量赋值称之为**初始化**

```javascript
var num;
num = 321; // Initialize
num = 888; // Not initialize
```



### Undefined

如果变量没有进行初始化, 那么变量中存储的是 `undefined`

```javascript
var num;
console.log(num); // 输出undefined
```



### 多种格式

变量的初始化有多种形式

```javascript
var num;
num = 123; // 先定义再初始化

var value = 666; // 定义的同时初始化

// 同时定义多个变量格式: var name1, name2, .....;
var num, value; // 同时定义两个变量
var num, value, value2, value3; // 同时定义四个变量

// 对多个变量初始化的值一样的格式: name1 = name2 = ..... = value;
var num;
var value;
num = value = 123; // 同时对num和value进行初始化, 并且存储的数据都是123

// 简写格式: var name1 = value1, name2 = value2, .....;
var num = 123, value = 666; // 同时定义并初始化两个变量
```

---

## 作用域 (Scope)



### 全局变量

- 定义在 `{}` 外面的变量

- 有效范围是从定义变量的那一行开始直到文件末尾都可以使用

	```js
	let num = 123;
	console.log(num); // 123
	if(true) {
	    console.log(num); // 123
	}
	console.log(num); // 123
	```



### 局部变量

- 定义在 `{}` 里面的变量

- 有效范围是从定义变量那一行开始直到大括号结束为止

	```js
	{
	    let num = 666;
	    console.log(num); // 666
	}
	console.log(num); // invalid
	if(true) {
	    console.log(num); // invalid
	}
	```



### 注意点

- `var` 定义的变量不区分全局和局部
- `let` 定义的变量区分全局和局部

---

## 注意点 (Notes)



### 变量可以相互赋值

变量之间是可以相互赋值的

```javascript
var num;
var value;
num = 123;
value = num; // 将num中的数值拷贝一份并赋值给value
console.log(num); // 输出123
console.log(value); // 输出123
```



### 同名变量

如果定义了同名的变量, 那么后定义的变量会覆盖先定义的变量

```javascript
var num = 666;
// num = 777; // 如果num前面没有var, 那么就是修改数据
var num = 888; // 如果num前面有var, 那么就不是修改数值, 而是定义一个新变量
console.log(num); // 输出888
```



### 定义变量的代码顺序

**老版本(ES6之前)**的JavaScript是可以先使用变量再定义变量, 并不会报错

```javascript
console.log(num); // 输出undefined
var num = 123;
```

原因是浏览器在解析JavaScript代码之前还会进行预处理操作, 将当前JavaScript代码中所有变量和函数的定义放到所有代码的最前面

```javascript
// 文件中的代码
console.log(num);
var num = 123;

/*
预处理之后的代码
var num; // 定义被放到最前面了
console.log(num); // 输出undefined
num = 123;
*/
```

---

## 新版本 (>=ES6) (New version)



### 定义变量

使用 `let` 定义变量

```javascript
let num = 123;
console.log(num); // 输出123
```



### 同名变量

如果定义了同名的变量, 会明确的报错

```javascript
let num = 123;
let num = 888; // 会明确的报错
console.log(num);
```



### 定义变量的代码顺序

**新版本(ES6及以后)**的JavaScript是不可以先使用变量再定义变量, 会明确的报错

```javascript
console.log(num); // 会明确的报错
let num = 123;
```

