# 函数 (Function)



> [Functions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)



## 定义

可以随时被反复执行的代码块



## 格式

```js
function myFunc(parameter1, parameter2, .....) {
    // statement
}

myFunc(parameter1, parameter2, .....); // execute all codes in the function;
```



## 为什么要使用函数

- 冗余代码变少了
- 需要修改的代码变少了



## 定义步骤

1. 写出 `Function` 的固定格式

	```js
	function myFunc(parameters) {
	    // statement
	}
	```

2. 给 `Function` 起一个有意义的名字 (遵守标识符命名规则和规范)

	```js
	function getSum(parameters) {
	    // statement
	}
	```

3. 确定函数的 `parameters`

	```js
	function getSum(a, b) {
	    // statement
	}
	```

4. 写入需要封装的代码

	```js
	function getSum(a, b) {
	    let res = a + b;
	}
	```

5. 确定 `function` 的返回值

	```js
	function getSum(a, b) {
	    let res = a + b;
	    return res; // 将res返回给函数的调用者
	}
	```



## 注意点

- 可以有 `parameter` 也可以没有

	```js
	// 有parameter
	function say(name) {
	    console.log("hello " + name);
	}
	say("Tony"); // "hello Tony"
	
	// 没有parameter
	function say() {
	    console.log("hello world");
	}
	say(); // "hello world"
	```

- 可以有 `返回值` 也可以没有

	```js
	// 有return value
	function getSum(a, b) {
	    return a + b;
	}
	console.log(getSum(10, 20)); // 30
	
	
	// 没有return value
	function say() {
	    console.log("hello world");
	}
	say(); // "hello world"
	```

- 没有 `返回值` 或没有通过 `return` 明确返回值的, 默认返回 `undefined`

	```js
	function say() {
	    console.log("hello world");
	    return; // undefined
	}
	console.log(say()); // undefined
	```

- `return` 和 `break` 相似, 后面不能编写任何语句(永远执行不到), `return` 会理解结束当前所在函数

	```js
	function say() {
	    console.log("hello world");
	    return; // terminate the current function
	    console.log("return后面的代码"); // 永远执行不到
	}
	say(); // "hello world"
	```

- 调用 `Function` 时, 实际 `parameter` 数量可以和形式 `parameter` 数量不一样, 形参没有接收到实参默认为 `undefined` , 多余的实参会被忽略

	```js
	function getSum(a, b) { // a 和 b 是形式参数
	    return a + b;
	}
	
	// 实参数等于形参数
	getSum(10, 20); // 10 和 20 是实际参数
	let num1 = 10;
	let num2 = 20;
	getSum(num1, num2); // num1 和 num2 是实际参数
	
	// 实参数少于形参数
	getSum(10); // 则a为10, b为undefined
	
	// 实参数多于形参数
	getSum(10, 20, 30); // 则a为10, b为20, 30被忽略
	```

- `Function` 也是引用数据类型 (对象类型) , 所以可以保存到 `变量` 中

	```js
	let say = function () {
	    console.log("hello world");
	}
	say(); // "hello world"
	```

---

## Arguments



> [The arguments object - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)



### 定义

一个类似 `Array` 的对象 (伪数组) , 接收并保留所有传递给函数的实参



### 示例

```js
function myFunc() {
    console.log(arguments[0]); // 10
    console.log(arguments[1]); // 20
    console.log(arguments[2]); // 30
}
myFunc(10, 20, 30); // 10, 20, 30

function getSum() {
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) {
        let num = arguments[i];
        sum += num;
    }
    return sum;
}
getSum(10, 20, 30); // 60
getSum(10, 20, 30, 40); // 100
```

---

## 扩展运算符 (...) (>=ES6)



### 定义

将传递给函数的所有实参打包到一个数组中



### 示例

```js
function myFunc(...values) {
    console.log(values); // [10, 20]
}
myFunc(10, 20);

function getSum(...values) {
    let sum = 0;
    for(let i = 0; i < values.length; i++) {
        let num = values[i];
        sum += num;
    }
    return sum;
}
getSum(10, 20, 30); // 60
getSum(10, 20, 30, 40); // 100
```

### 注意点

- 只能写在形参列表的最后,  不然会报错

	```js
	function getSum(...values, a) { // Uncaught SyntaxError: Rest parameter must be last formal parameter
	    // statement
	}
	getSum(10, 20);
	```

---

## 设置形参默认值



### ES6之前 (<ES6)

- 使用逻辑或运算符

	```js
	// 原理: expA || expB
	// 如果 expA == true, 那么返回 expA
	// 如果 expA == false, 那么返回 expB 无论 expB == true or false
	function getSum(a, b) {
	    a = a || 10;
	    b = b || 20;
	    console.log(a, b);
	}
	getSum(); // 10, 20
	getSum("abc", 80); // "abc", 80
	```



### <span style="color: red;"><推荐></span> ES6之后 (>=ES6)

- 直接在形参后面写上 `=` 和默认值

	```js
	function getSum(a = 10, b = 20) {
	    console.log(a, b);
	}
	getSum(); // 10, 20
	getSum("abc", 80); // "abc", 80
	```

- 从其他函数中获取

	```js
	function getSum(a = 10, b = getDefault()) {
	    console.log(a, b);
	}
	
	function getDefault() {
	    return 20;
	}
	
	getSum(); // 10, 20
	getSum("abc", 80); // "abc", 80
	```

---

## 函数作为参数或返回值



### `Function` 作为 `parameter`

```js
let say = function () {
    console.log("hello world");
}

function test(fn) {
    fn();
}

test(say); // "hello world"
```



### `Function` 作为 `return value`

- JavaScript 可以在 `Function` 中嵌套 `Function`

```js
function test() {
    let say = function () {
        console.log("hello world");
    }
    return say;
}

let fn = test;
fn(); // "hello world"
```

---

## 匿名函数 (Anonymous function)



### 定义

没有名称的函数

```js
function() {
    // statement
}
```



### 注意点

- 不能只定义不使用



### 应用场景

- 作为其它函数的参数

	```js
	function test(fn) {
	    fn();
	}
	
	test(function () {
	    console.log("hello world");
	}); // hello world
	```

- 作为其它函数的返回值

	```js
	function test() {
	    return function () {
	        console.log("hello world");
	    };
	}
	
	let fn = test;
	fn(); // "hello world"
	```

- 作为一个立即执行的函数, 需要用 `()` 将函数定义包裹起来

	```js
	(function () {
	    console.log("hello world");
	})();
	```

---

## <span style="color: red;"><推荐></span> 箭头函数 (Arrow function) (>=ES6)



### 定义

ES6中新增的一种定义函数的格式, 可以简化定义函数的代码



### 格式

```js
let func = () => {
    // statement
}
```



### 注意点

- 如果只有一个形参, 那么 `()` 可以省略

	```js
	let say = name => {
	    console.log("hello " + name);
	}
	say("tony"); // "hello tony"
	```

- 如果 `{}` 中只有一句代码, 那么 `{}` 可以省略, 这一句代码默认就是 `return value`

	```js
	let say = name => console.log("hello " + name);
	say("tony"); // "hello tony"
	```
	
- `箭头函数` 中的 `this` 不是 `调用者` , 是 `父作用域`

    ```js
    let p = {
      name: "lnj",
      say: function () {
        console.log(this);
      }
      hi: () => {
        console.log(this);
      }
    }
    p.say(); // p
    
    ```

    

---

## <span style="color: blue;"><不常用></span> 递归函数



### 定义

在函数中自己调用自己 (无限套娃)



### 示例

```js
// 缺陷: 输错 n 次密码就会弹出 (n + 1) 次login
let login = () => {
    let pwd = prompt("请输入密码");
    if(pwd !== "123456") {
        login();
    }
    alert("欢迎回来");
}
```

---

## 作用域



> [function - What is the scope of variables in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript)



### 全局作用域

在 `{}` 外面的作用域

- 用 `let` / `var` 定义的变量都是 `全局变量`



### 局部作用域

`Function` 后面的 `{}` 中的作用域

- 用 `let` / `var` 定义的变量都是 `局部变量`
- <span style="color: red;"><极为不推荐></span> 省略 `let` / `var` 的变量就是全局变量



### 块级作用域

非 `Function` 后面的 `{}` 中的作用域

- 用 `let` 定义的变量是 `局部变量`

- 用 `var` 定义的变量是 `全局变量`
- <span style="color: red;"><极为不推荐></span> 省略 `let` / `var` 的变量就是全局变量
- 如果块级作用域没有被执行, 那么其中的 `全局变量` 不会被赋值, 默认值为 `undefined`



### 示例

```js
//全局作用域
let name1; // 全局变量
var name2; // 全局变量

let func = () => {
    // 局部作用域
    let name3; // 局部变量
    var name4; // 局部变量
}

{
    // 块级作用域
    let name5; // 局部变量
    var name6; // 全局变量
}

if(false) {
    // 块级作用域
    let name7; // 局部变量
    var name8; // 全局变量
}

while(false) {
    // 块级作用域
    let name9; // 局部变量
    var name10; // 全局变量
}

for(;;) {
    // 块级作用域
    let name11; // 局部变量
    var name12; // 全局变量
}

do {
    // 块级作用域
    let name13; // 局部变量
    var name14; // 全局变量
}
while(false);

switch(exp) {
    // 块级作用域
    let name15; // 局部变量
    var name16; // 全局变量
}
```

---

## 作用域链



> [Scope Chain in Javascript - Stack Overflow](https://stackoverflow.com/questions/1484143/scope-chain-in-javascript#:~:text=Scope chain in javascript is,browser ( global in NodeJS ).&text=The scope chain can be,at where functions are defined.)



### ES6之前 (<ES6)



#### 语法特点

- 用 `var` 定义变量
- 没有 `块级作用域` , 只分 `全局作用域` 和 `局部作用域`
- `Function` 的 `{}` 之外的都是 `全局作用域` , 之内的都是 `局部作用域`



#### 作用域链

- `全局作用域` 也称之为 `0级作用域` 
- 定义 `Function` 开启的作用域, 即为 `1级` / `2级` / `3级` / `.....级作用域`
- 在 `全局作用域` 中定义 `Function` 开启的即为 `1级作用域` , 在 `1级作用域` 中定义 `Function` 开启的即为 `2级作用域`, 以此类推
- JavaScript 会将作用域形成一个链条 `0 => 1 => 2 => 3 => 4 => .....`
- 除了 `0级作用域` , 当前作用域的级别等于上一级 `+1`



#### 查找在作用域链中的查找规则

- 先找当前所在的 `作用域` , 如找到则使用当前 `作用域` 中的变量
- 如果当前所在的 `作用域` 没有找到, 则去上一级 `作用域` 中查找
- 以此类推直到 `0级作用域` 位置, 如果还没找到, 则报错



#### 示例

```js
// 全局作用域 / 0级作用域

var num = 123;

function demo() {
    // 1级作用域
    var num = 456;
    
    function test() {
        // 2级作用域
        // 以此类推
        
        var num = 789;
        console.log(num); //789
    }
    test();
}
demo();
```



### ES6之后 (>=ES6)



#### 语法特点

- 用 `let` 定义变量
- <span style="color: red;"><新></span> 除了 `全局作用域` 和 `局部作用域` 之外, 还有 `块级作用域`
- <span style="color: red;"><新></span> `Function` 的 `{}` 之外的都是 `全局作用域` , 之内的都是 `局部作用域`, 除了 `Function` 之外的 `{}` ( `代码块` ) 之内的都是 `块级作用域`



#### 作用域链

- `全局作用域` 也称之为 `0级作用域` 
- 定义 `Function` 或 `代码块` 开启的作用域, 即为 `1级` / `2级` / `3级` / `.....级作用域`
- <span style="color: red;"><新></span> 在 `全局作用域` 中定义 `Function` 或 `代码块` 开启的即为 `1级作用域` , 在 `1级作用域` 中定义 `Function` 或 `代码块` 开启的即为 `2级作用域`, 以此类推
- JavaScript 会将作用域形成一个链条 `0 => 1 => 2 => 3 => 4 => .....`
- 除了 `0级作用域` , 当前作用域的级别等于上一级 `+1`



#### 查找在作用域链中的查找规则

- 先找当前所在的 `作用域` , 如找到则使用当前 `作用域` 中的变量
- 如果当前所在的 `作用域` 没有找到, 则去上一级 `作用域` 中查找
- 以此类推直到 `0级作用域` 位置, 如果还没找到, 则报错



#### 示例

```js
// 全局作用域 / 0级作用域

let num = 123;

{
    // 1级作用域
    let num = 456;
    
    function test() {
        // 2级作用域
        // 以此类推
        
        let num = 789;
        console.log(num); //789
    }
    test();
}
```

---

## 预解析



### 定义

浏览器在执行JavaScript代码时会先 `预解析` 再 逐行执行代码



### 规则

1. 将 `var` 变量声明和函数声明提升到当前作用域最前面
2. 将省域代码按照书写顺序依次放到后面

```js
// 预解析之前
say(); // "hello world"
function say() {
    console.log("hello world");
}

//预解析之后
function say() {
    console.log("hello world");
}
say(); // "hello world"
```



### 注意点

- `let` 定义的变量不会被提升

- 如果将函数赋值给一个 `var` 定义的变量, 那么只有变量会被预解析, 而函数不会

	```js
	// 预解析之前
	say(); // error
	var say = function () {
	    console.log("hello world");
	}
	
	// 预解析之后
	var say;
	say(); // error
	say = function () {
	    console.log("hello world");
	}
	```

- 在高级浏览器中 (>=IE11) , 不会对 `{}` 中定义的函数进行提升, <span style="color: red;">千万不要像下面示例这么写, 这种写法只会出现在面试题目中</span>

	```js
	// 预解析之前和之后在高级浏览器中一个样
	if(true) {
	    function demo() {
	        console.log("demo1");
	    }
	}
	else {
	    function demo() {
	        console.log("demo1");
	    }
	}
	demo(); // "demo1", 低级浏览器(<=IE10)会输出"demo2"但一般不考虑
	```

- 如果变量名称和函数同名, 那么函数优先级高于变量 (变量不赋值), 反之变量优先级高于函数, <span style="color: red;">尽量避免变量名称和函数名称同名</span>

	```js
	// 预解析之前
	console.log(value); // 函数value()的定义
	var value = 123;
	function value() {
	    console.log("fn value");
	}
	console.log(value); // 123
	
	// 预解析之后
	var value;
	function value() {
	    console.log("fn value");
	}
	console.log(value); // 函数value()的定义
	value = 123;
	console.log(value); // 123
	```

---

## 闭包 (Closure)



### 定义

一种特殊的函数, 生成闭包需要满足两个条件

- 函数嵌套 / 块级作用域中定义函数
- 内部函数引用外部函数的数据 / 函数引用块级作用域的数据

则内部函数就是闭包



### 特点

- 只要闭包还在使用外部函数的数据, 那么外部函数的数据就不会被释放, 延长了外部函数数据的生命周期



### 注意点

- 后续不需要使用闭包时, 要手动将闭包设置为 `null` , 不然会出现 `内存泄露`



### 示例

```js
function test() {
  var i = 666;
  return function demo() { // demo() 即为闭包
    console.log(i);
  }
}

let fn = test();
fn(); // 666
```

```js
for(let i = 0; i < 3; i++) {
  function test() { // test() 即为闭包
    console.log(i);
  }
}

test(); // 2
```



---

